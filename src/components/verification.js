const blessed = require("blessed");
import Component from "./component";

export default class VerificationComponent extends Component {

    constructor() {
        super();

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
        if (!super.render(data)) return;

        const stats = data["stats"];

        let content = "";

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


        content += `{white-fg}{bold}MSGS:     ${processed_msgs}{/bold}{/white-fg}\n`;
        content += `{white-fg}{bold}BLOCKS:   ${processed_blocks}{/white-fg}\n`;
        content += `{white-fg}{bold}TXS:      ${processed_txs}{/white-fg}\n`;
        content += `{white-fg}{bold}BAD TXS:  ${invalid_txs}{/white-fg}\n`;
        content += `{white-fg}{bold}THREADS:  ${data.config.server.verification_threads}{/bold}{/white-fg}\n`;

        for (const stat of Object.keys(stats)) {
            if (stat.startsWith("verification_") && stat.endsWith("::queue")) {
                const queue_num = Number(stat.split("::")[0].split("_")[1]) + 1;
                const queue = stats[stat]["stats"]["capacity"]["value"];
                content += `{white-fg}{bold}QUEUE${queue_num}:   ${queue}{/bold}{/white-fg}\n`;
            }
        }

        this.component.setContent(content);
    }
}