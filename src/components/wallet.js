const blessed = require("blessed");
import Component from "./component";

export default class WalletComponent extends Component {

    constructor() {
        super();

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
        if (!super.render(data)) return;

        let content = "";
        content += this.renderStat(data["stats"], "SLIPS", "wallet::state", "total_slips", 7);
        content += this.renderStat(data["stats"], "UNSPENT", "wallet::state", "unspent_slips", 7);
        this.component.setContent(content);
    }
}