const blessed = require("blessed");

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
        if (!data.active) {
            this.component.hide();
            return;
        }

        this.component.show();

        let content = "";
        if (data["stats"]["blockchain::state"]) {
            content += `{bold}HEIGHT:  ${data["stats"]["blockchain::state"]["params"]["block_count"]}{/bold}`;
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