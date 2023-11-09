const blessed = require("blessed");
import Component from "./component";

export default class ConsensusComponent extends Component {

    constructor() {
        super();

        this.component = blessed.box({
            align: 'left',
            top: "200",
            tags: true,
            left: '75%',
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

        let content = "";
        content += this.renderStat(data["stats"], "CREATED", "consensus::blocks_created", "total", 7);
        content += this.renderStat(data["stats"], "FETCHED", "consensus::blocks_fetched", "total", 7);
        content += this.renderStat(data["stats"], "TXS", "consensus::received_tx", "total", 7);
        content += this.renderStat(data["stats"], "GTS", "consensus::received_gts", "total", 7);
        content += this.renderStat(data["stats"], "QUEUE", "consensus::queue", "capacity", 7, false);
        this.component.setContent(content);
    }
}