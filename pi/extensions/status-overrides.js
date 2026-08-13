/**
 * Custom extension status overrides.
 *
 * pi's extension status is a Map keyed by name: the LAST setStatus(key, ...)
 * call wins. Package extensions (e.g. ponytail's pi-extension, pi-mcp-adapter)
 * set their own status in session_start / agent_start / agent_end handlers,
 * and because packages load late, they normally win over extensions in
 * ~/.pi/agent/extensions/.
 *
 * Every override below writes LAST by deferring the write to the end of the
 * current event-loop tick (setTimeout 0). Event handlers run synchronously,
 * so by the time the timer fires, all package handlers for that event have
 * already run and any status they set is overwritten — regardless of load
 * order. Updating a package therefore cannot clobber these overrides.
 *
 * Add new overrides to the OVERRIDES array: key = the status key to take
 * over, events = lifecycle events to react to, handle() returns the status
 * text (or undefined to clear it).
 */

// pi-mcp-adapter publishes status snapshots through pi.events.
const MCP_STATUS_EVENT = "pi-mcp-adapter/status/v1";
let mcpSnapshot = null; // { connectedCount, disabledCount, servers: [...] }
let cachedUi = null;

function renderMcp(theme) {
  if (!mcpSnapshot) return undefined;
  const enabled = mcpSnapshot.servers.length - mcpSnapshot.disabledCount;
  return theme.fg("dim", `MCP(${mcpSnapshot.connectedCount}/${enabled})`);
}

const OVERRIDES = [
  {
    key: "ponytail",
    events: ["session_start", "agent_start", "agent_end", "input"],
    active: false,
    handle(event, _ctx, theme) {
      if (event === "agent_start") this.active = true;
      if (event === "agent_end") this.active = false;
      const indicator = this.active ? theme.fg("accent", "●") : theme.fg("dim", "○");
      const label = this.active ? theme.fg("accent", "Ponytail") : theme.fg("dim", "Ponytail");
      return indicator + label;
    },
  },
  {
    key: "mcp",
    events: ["session_start", "agent_start", "agent_end", "input"],
    handle(_event, _ctx, theme) {
      return renderMcp(theme);
    },
  },
  // 后续自定义 status 在此追加
];

export default function (pi) {
  // Subscribe to MCP status snapshots (adapter emits through pi.events) so the
  // connected/enabled counts stay current. Also deferred: the adapter itself
  // writes "mcp" synchronously during the same status update, so we must land
  // after it.
  pi.events?.on?.(MCP_STATUS_EVENT, (snapshot) => {
    mcpSnapshot = snapshot;
    if (!cachedUi?.setStatus) return;
    let theme;
    try {
      theme = cachedUi.theme;
      if (!theme?.fg) return;
    } catch {
      return;
    }
    const text = renderMcp(theme);
    setTimeout(() => cachedUi.setStatus("mcp", text ?? undefined), 0);
  });

  for (const override of OVERRIDES) {
    for (const eventName of override.events) {
      pi.on(eventName, (_event, ctx) => {
        if (!ctx?.ui?.setStatus) return;
        cachedUi = ctx.ui;
        let theme;
        try {
          theme = ctx.ui.theme;
          if (!theme?.fg) return;
        } catch {
          return;
        }
        const text = override.handle.call(override, eventName, ctx, theme);
        // Defer to the end of the current event loop tick so this write lands
        // after every package/other-extension handler for the same key.
        setTimeout(() => ctx.ui.setStatus(override.key, text ?? undefined), 0);
      });
    }
  }
}
