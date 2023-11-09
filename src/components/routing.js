const blessed = require("blessed");
import Component from "./component";

export default class RoutingComponent extends Component {

    constructor() {
        super();
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

        let content = "";
        content += this.renderStat(data["stats"], "MSGS", "routing::incoming_msgs", "total", 6);
        content += this.renderStat(data["stats"], "BLOCKS", "routing::received_blocks", "total", 6);
        content += this.renderStat(data["stats"], "TXS", "routing::received_txs", "total", 6);
        content += this.renderStat(data["stats"], "CEIL", "routing::sync_state", "block_ceiling", 6);
        this.component.setContent(content);
    }
}