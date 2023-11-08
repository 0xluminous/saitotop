const blessed = require("blessed");
const { timeago } = require("../utils");

export default class VerificationComponent {

    constructor() {
        this.component = blessed.box({
            align: 'left',
            top: "200",
            tags: true,
            left: '50%',
            scrollable: true,
            mouse: true,
            border: "line",
            label: "Verification",
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

        // Verification
        //  verification_0::invalid_txs        {"total":"0","current_rate":"0.00","max_rate":"0.00","min_rate":"0.00"} 
        //  verification_0::processed_blocks   {"total":"47","current_rate":"0.00","max_rate":"1.50","min_rate":"0.00"}
        //  verification_0::processed_msgs     {"total":"61","current_rate":"0.00","max_rate":"4.49","min_rate":"0.00"}
        //  verification_0::processed_txs      {"total":"7","current_rate":"0.00","max_rate":"1.50","min_rate":"0.00"}
        //  verification_0::queue              {"capacity":"1000000 / 1000000"}                             

        let invalid_txs = Object.keys(stats).map((stat) => {
            if (stat.startsWith("verification_") && stat.endsWith("::invalid_txs")) {
                return stats[stat]["stats"]["total"]["value"];
            }
            return 0;
        }).reduce((a, b) => a + b, 0);

        let processed_blocks = Object.keys(stats).map((stat) => {
            if (stat.startsWith("verification_") && stat.endsWith("::processed_blocks")) {
                return stats[stat]["stats"]["total"]["value"];
            }
            return 0;
        }).reduce((a, b) => a + b, 0);

        let processed_msgs = Object.keys(stats).map((stat) => {
            if (stat.startsWith("verification_") && stat.endsWith("::processed_msgs")) {
                return stats[stat]["stats"]["total"]["value"];
            }
            return 0;
        }).reduce((a, b) => a + b, 0);

        let processed_txs = Object.keys(stats).map((stat) => {
            if (stat.startsWith("verification_") && stat.endsWith("::processed_txs")) {
                return stats[stat]["stats"]["total"]["value"];
            }
            return 0;
        }).reduce((a, b) => a + b, 0);


        content += `{white-fg}{bold}MSGS:    ${processed_msgs}{/bold}{/white-fg}\n`;
        content += `{white-fg}{bold}BLOCKS:  ${processed_blocks}{/white-fg}\n`;
        content += `{white-fg}{bold}TXS:     ${processed_txs}{/white-fg}\n`;
        content += `{white-fg}{bold}BAD TXS: ${invalid_txs}{/white-fg}\n`;
        content += `{white-fg}{bold}THREADS: ${data.config.server.verification_threads}{/bold}{/white-fg}\n`;

        // let processed_blocks = Object.keys(stats).map((stat) => {
        //     if (stat.startsWith("verification_") && stat.endsWith("::processed_blocks")) {
        //         return stats[stat]["stats"]["total"]["value"];
        //     }
        //     return 0;
        // }).reduce((a, b) => a + b, 0);
        for (const stat of Object.keys(stats)) {
            if (stat.startsWith("verification_") && stat.endsWith("::queue")) {
                const queue_num = Number(stat.split("::")[0].split("_")[1]) + 1;
                const queue = stats[stat]["stats"]["capacity"]["value"];
                content += `{white-fg}{bold}QUEUE${queue_num}:  ${queue}{/bold}{/white-fg}\n`;
            }
        }

        this.component.setContent(content);
    }
}