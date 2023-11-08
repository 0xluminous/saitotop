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
            // stat.color = "blue";
            const color = stringToColor(stat.value);
            content += `{white-fg}{bold}TARGET:  {${color}-bg}{black-fg}  {/black-fg}{/${color}-bg} ${value}{/white-fg}{/bold} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        /*
        if (this.data["mining::golden_tickets"]) {
            content += "\n";
            const target = data["mining::golden_tickets"]["params"]["current target"];
            const color1 = `#${target.substring(0, 6)}`;
            const color2 = invert(color1);
            content += `{bold}TARGET:  {${color1}-fg}{${color2}-bg}${data["mining::golden_tickets"]["params"]["current target"]}{/bold}{/${color2}-bg}{/${color1}-fg}`;
        }

        if (data["mining::golden_tickets"]) {
            content += "\n";

            if (data["mining::golden_tickets"]["params"]["miner_active"] === true) {
                content += '{bold}MINING:  {white-fg}{green-bg}YES{/bold}{/green-bg}{/white-fg}';
            } else {
                content += '{bold}MINING:  {white-fg}{red-bg}NO{/bold}{/red-bg}{/white-fg}';
            }
        }

        if (data["mempool::state"]) {
            content += "\n";
            content += `{bold}MEMPOOL: tx=${data["mempool:state"]["params"]["transactions"]} blk=${data["mempool:state"]["params"]["blocks_queue"]}{/bold}`;
        }
        */

        this.component.setContent(content);
    }
}