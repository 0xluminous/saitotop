const blessed = require("blessed");
import { timeago, truncateHash, stringToColor } from "../utils"
import Component from "./component";

export default class SummaryComponent extends Component {

    constructor() {
        super();

        this.component = blessed.box({
            top: "0",
            height: "190",
            width: "75%",
            padding: { top: 1, left: 1, right: 1, bottom: 0 },
            tags: true,
        });
    }

    render(data) {
        if (!super.render(data)) return;

        const stats = data["stats"];

        let content = "";
        let event = null;

        content += this.renderStat(stats, "HEIGHT", "blockchain::state", "block_count");

        if (event = stats["mining::golden_tickets"]) {
            const stat = event["stats"]["current target"];
            const last_value = stat.last_value ? `${truncateHash(stat.last_value, 4)} ` : "";
            const color = stringToColor(stat.value);
            content += `{white-fg}{bold}TARGET:  {${color}-bg}{black-fg}  {/black-fg}{/${color}-bg} ${stat.value}{/white-fg}{/bold} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["mempool::state"]) {
            const transactions = event["stats"]["transactions"]["value"];
            const blocks = event["stats"]["blocks_queue"]["value"];
            content += `{white-fg}{bold}MEMPOOL: tx=${transactions} blk=${blocks}{/bold}{/white-fg}\n`;
        }

        if (event = stats["mining::golden_tickets"]) {
            const stat = event["stats"]["miner_active"];
            const value = (stat.value ? "{white-fg}{green-bg}MINING{/green-bg}{/white-fg}" : "{white-fg}{red-bg}NOT MINING{/red-bg}{/white-fg}");
            content += `{white-fg}{bold}MINING:  ${value}{/bold}{/white-fg}\n`;
        }

        content += this.renderStat(stats, "WALLET", "wallet::state", "current_balance");

        this.component.setContent(content);
    }
}
