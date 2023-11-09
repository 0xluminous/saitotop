const { timeago } = require("../utils");

export default class Component {

    renderStat(stats, label, event, prop, padding = 0, last = true) {
        const data = stats[event];
        if (!data) return "";

        const stat = data["stats"][prop];
        if (!stat) return "";

        let last_value = stat.last_value ? `${stat.last_value} ` : "";
        if (!last) last_value = "";

        return `{white-fg}{bold}${label}:  ${"".padStart(padding - label.length, " ")}${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
    }
}