const blessed = require("blessed");
const { timeago } = require("../utils");

export default class RoutingComponent {

    constructor() {
        this.component = blessed.box({
            align: 'left',
            top: "200",
            tags: true,
            left: '25%',
            scrollable: true,
            mouse: true,
            border: "line",
            label: "Routing",
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


        if (event = stats["routing::incoming_msgs"]) {
            const stat = event["stats"]["total"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}MSGS:   ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["routing::received_blocks"]) {
            const stat = event["stats"]["total"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}BLOCKS: ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["routing::received_txs"]) {
            const stat = event["stats"]["total"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}TXS:    ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["network::sync_state"]) {
            const stat = event["stats"]["block_ceiling"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}CEIL:   ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        this.component.setContent(content);
    }
}