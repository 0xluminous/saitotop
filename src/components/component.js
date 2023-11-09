const { timeago } = require("../utils");

export default class Component {
    constructor() {
        this.show_active = true;
        this.component = null;
    }

    renderStat(stats, label, event, prop, padding = 0, last = true) {
        if (!stats) return "";

        const data = stats[event];
        if (!data) return "";

        const stat = data["stats"][prop];
        if (!stat) return "";

        let last_value = stat.last_value ? `${stat.last_value} ` : "";
        if (!last) last_value = "";

        return `{white-fg}{bold}${label}:  ${"".padStart(padding - label.length, " ")}${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
    }

    render(data) {
        if (this.show_active && !data.active) {
            this.component.hide();
            return false;
        } else if (!this.show_active && data.active) {
            this.component.hide();
            return false;
        }

        this.component.show();
        return true;
    }
}