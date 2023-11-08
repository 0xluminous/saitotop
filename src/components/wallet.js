const blessed = require("blessed");
const { timeago } = require("../utils");

export default class WalletComponent {

    constructor() {
        this.component = blessed.box({
            align: 'left',
            top: "45%",
            tags: true,
            left: '50%',
            scrollable: true,
            mouse: true,
            border: "line",
            label: "Wallet",
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

        //  wallet::state                      {"total_slips":"0","unspent_slips":"0","current_balance":"0"}

        if (event = stats["wallet::state"]) {
            const stat = event["stats"]["total_slips"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}SLIPS:   ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["wallet::state"]) {
            const stat = event["stats"]["unspent_slips"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}UNSPENT: ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        this.component.setContent(content);
    }
}