const blessed = require("blessed");
import Component from "./component";

export default class MiningComponent extends Component {

    constructor() {
        super();

        this.component = blessed.box({
            align: 'left',
            top: "45%",
            tags: true,
            left: '0%',
            scrollable: true,
            mouse: true,
            border: "line",
            label: "Mining",
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
        content += this.renderStat(data["stats"], "DIFFICULTY", "mining::golden_tickets", "current difficulty", 14);
        content += this.renderStat(data["stats"], "GOLDEN TICKETS", "mining::golden_tickets", "total", 14);
        this.component.setContent(content);
    }
}