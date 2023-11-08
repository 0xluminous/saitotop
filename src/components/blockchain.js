const blessed = require("blessed");
const { timeago } = require("../utils");

export default class BlockchainComponent {

    constructor() {
        this.component = blessed.box({
            align: 'left',
            top: "45%",
            tags: true,
            left: '25%',
            scrollable: true,
            mouse: true,
            border: "line",
            label: "Blockchain",
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

        //  blockchain::state                  {"utxo_size":"63","block_count":"43","longest_chain_len":"43"}                                                                                      
        if (event = stats["blockchain::state"]) {
            const stat = event["stats"]["utxo_size"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}UTXO SIZE:     ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["blockchain::state"]) {
            const stat = event["stats"]["longest_chain_len"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}LONGEST CHAIN: ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        this.component.setContent(content);
    }
}