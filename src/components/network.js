const blessed = require("blessed");
const { timeago, truncateHash, stringToColor } = require("../utils");

export default class NetworkComponent {

    constructor() {
        this.component = blessed.box({
            top: "0%",
            height: "20%",
            width: "80%",
            padding: { top: 0, left: 1, right: 1, bottom: 0 },

            tags: true,
            content: "Initializing...",
        });

        this.i = 0;
    }

    render(data) {
        if (!data.active || !data.stats) {
            this.component.hide();
            return;
        }

        this.component.show();

        const stats = data["stats"];

        let content = "";
        let event = null;

        if (event = stats["blockchain::state"]) {
            const stat = event["stats"]["block_count"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}HEIGHT:  ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["mining::golden_tickets"]) {
            const stat = event["stats"]["current target"];
            const value = truncateHash(stat.value, 4);
            const last_value = stat.last_value ? `${truncateHash(stat.last_value, 4)} ` : "";
            const color = stringToColor(stat.value);
            content += `{white-fg}{bold}TARGET:  {${color}-bg}{black-fg}  {/black-fg}{/${color}-bg} ${value}{/white-fg}{/bold} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["mining::golden_tickets"]) {
            const stat = event["stats"]["miner_active"];
            const value = (stat.value ? "{white-fg}{green-bg}MINING{/green-bg}{/white-fg}" : "{white-fg}{red-bg}NOT MINING{/red-bg}{/white-fg}");
            content += `{white-fg}{bold}MINING:  ${value}{/bold}{/white-fg}\n`;
        }

        if (event = stats["mempool::state"]) {
            const transactions = event["stats"]["transactions"]["value"];
            const blocks = event["stats"]["blocks_queue"]["value"];
            content += `{white-fg}{bold}MEMPOOL: tx=${transactions} blk=${blocks}{/bold}{/white-fg}`;
        }

        this.component.setContent(content);
    }
}