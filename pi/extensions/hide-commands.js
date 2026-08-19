/**
 * Hide selected commands from the "/" autocomplete panel.
 *
 * pi has no built-in per-command hiding, so this extension wraps the
 * autocomplete provider (ctx.ui.addAutocompleteProvider) and filters out
 * items whose source tag or command name matches a hide rule.
 *
 * Two kinds of rules:
 * - HIDDEN_SOURCES: hide every command coming from a package source tag
 *   (e.g. "u:npm:pi-subagents"), including its /skill:xxx entries, except
 *   those listed in HIDDEN_EXCEPTIONS.
 * - HIDDEN_COMMAND_PREFIXES: hide commands by name prefix as a fallback
 *   (matches both "/name" and "/skill:name" forms).
 *
 * Hiding only affects the suggestion panel; commands can still be typed and
 * executed manually.
 */

const HIDDEN_SOURCES = [
  "u:npm:pi-subagents",
  "u:npm:pi-web-access",
  "u:npm:@dietrichgebert/ponytail",
  "u:npm:@juicesharp/rpiv-todo",
];

/** Command names to keep even when their source package is hidden. */
const HIDDEN_EXCEPTIONS = [];

const HIDDEN_COMMAND_PREFIXES = [];

function sourceTagOf(item) {
  const match = (item.description || "").match(/^\[([^\]]+)\]/);
  return match ? match[1] : "";
}

function shouldHide(item) {
  const tag = sourceTagOf(item);
  const name = (item.value || item.label || "").replace(/^\//, "");
  if (HIDDEN_SOURCES.includes(tag) && !HIDDEN_EXCEPTIONS.includes(name)) return true;
  const withoutSkill = name.replace(/^skill:/, "");
  return HIDDEN_COMMAND_PREFIXES.some((prefix) => name.startsWith(prefix) || withoutSkill.startsWith(prefix));
}

export default function (pi) {
  let installed = false;
  pi.on("session_start", (_event, ctx) => {
    // session_start fires on /new, /resume and session switches; without this
    // guard each firing wraps the (already wrapped) provider one more time.
    if (installed) return;
    installed = true;
    ctx.ui.addAutocompleteProvider((current) => ({
      async getSuggestions(lines, cursorLine, cursorCol, options) {
        const suggestions = await current.getSuggestions(lines, cursorLine, cursorCol, options);
        if (!suggestions) return null;
        return { ...suggestions, items: suggestions.items.filter((item) => !shouldHide(item)) };
      },
      applyCompletion(lines, cursorLine, cursorCol, item, prefix) {
        return current.applyCompletion(lines, cursorLine, cursorCol, item, prefix);
      },
      shouldTriggerFileCompletion(lines, cursorLine, cursorCol) {
        return current.shouldTriggerFileCompletion?.(lines, cursorLine, cursorCol) ?? true;
      },
    }));
  });
}
