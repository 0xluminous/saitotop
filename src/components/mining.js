const blessed = require("blessed");
const { timeago } = require("../utils");

export default class MiningComponent {

    constructor() {
        this.component = blessed.box({
            align: 'left',
            top: "45%",
            tags: true,
            left: '0%',
            scrollable: true,
            mouse: true,
            border: "line",
            label: "Mining",
            width: '25%',
            height: '25%',
            tags: true
        });
    }

    render(data) {
        if (!data.active) {
            this.component.hide();
            return;
        }

        this.component.show();

        const stats = data["stats"];

        let content = "";
        let event = null;

        // Mining
        //  mining::golden_tickets             {"total":"10","current difficulty":"21"}
        //  blockchain::state                  {"utxo_size":"63","block_count":"43","longest_chain_len":"43"}                                                                                      
        if (event = stats["mining::golden_tickets"]) {
            const stat = event["stats"]["current difficulty"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}DIFFICULTY:     ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["mining::golden_tickets"]) {
            const stat = event["stats"]["total"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}GOLDEN TICKETS: ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        this.component.setContent(content);
    }
}