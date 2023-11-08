const blessed = require("blessed");
const { timeago } = require("../utils");

export default class NetworkingComponent {

    constructor() {
        this.component = blessed.box({
            align: 'left',
            top: "200",
            tags: true,
            left: '0%',
            scrollable: true,
            mouse: true,
            border: "line",
            label: "Networking",
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


        if (event = stats["network::incoming_msgs"]) {
            const stat = event["stats"]["total"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}IN:  ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["network::outgoing_msgs"]) {
            const stat = event["stats"]["total"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}OUT:  ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["network::queue"]) {
            const stat = event["stats"]["capacity"];
            content += `{white-fg}{bold}QUEUE: ${stat.value}{/bold}{/white-fg} {gray-fg}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        this.component.setContent(content);
    }
}