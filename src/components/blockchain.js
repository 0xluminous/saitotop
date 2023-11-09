const blessed = require("blessed");
import Component from "./component";

export default class BlockchainComponent extends Component {

    constructor() {
        super();

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
        if (!super.render(data)) return;

        let content = "";
        content += this.renderStat(data["stats"], "UTXO SIZE", "blockchain::state", "utxo_size", 13);
        content += this.renderStat(data["stats"], "LONGEST CHAIN", "blockchain::state", "longest_chain_len", 13);
        this.component.setContent(content);
    }
}