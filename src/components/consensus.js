const blessed = require("blessed");
const { timeago } = require("../utils");

export default class ConsensusComponent {

    constructor() {
        this.component = blessed.box({
            align: 'left',
            top: "200",
            tags: true,
            left: '50%',
            scrollable: true,
            mouse: true,
            border: "line",
            label: "Consensus",
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


        if (event = stats["consensus::blocks_created"]) {
            const stat = event["stats"]["total"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}CREATED:  ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["consensus::blocks_fetched"]) {
            const stat = event["stats"]["total"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}FETCHED:  ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["consensus::received_tx"]) {
            const stat = event["stats"]["total"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}TXS:      ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["consensus::received_gts"]) {
            const stat = event["stats"]["total"];
            const last_value = stat.last_value ? `${stat.last_value} ` : "";
            content += `{white-fg}{bold}GTS:      ${stat.value}{/bold}{/white-fg} {gray-fg}${last_value}${timeago(stat.date)} ago{/gray-fg}\n`;
        }

        if (event = stats["consensus::queue"]) {
            const stat = event["stats"]["capacity"];
            content += `{white-fg}{bold}QUEUE:    ${stat.value}{/bold}{/white-fg} {gray-fg}${timeago(stat.date)} ago{/gray-fg}\n`;
        }


        // Consensus
        //  consensus::blocks_created          {"total":"0","current_rate":"0.00","max_rate":"0.00","min_rate":"0.00"}                                                                             
        //  consensus::blocks_fetched          {"total":"47","current_rate":"0.00","max_rate":"1.50","min_rate":"0.00"}                                                                            
        //  consensus::queue                   {"capacity":"10000 / 10000"}                                                                                                                        
        //  consensus::received_gts            {"total":"13","current_rate":"0.00","max_rate":"1.00","min_rate":"0.00"}                                                                            
        //  consensus::received_tx             {"total":"7","current_rate":"0.00","max_rate":"1.50","min_rate":"0.00"}                                                                             

        this.component.setContent(content);
    }
}