const blessed = require("blessed");
import Component from "./component";

export default class StatusbarComponent extends Component {

    constructor() {
        super();

        this.left = blessed.box({
            width: "60%",
            padding: { top: 0, left: 1, right: 1, bottom: 0 },
            valign: "bottom",
            content: "(d)debug  (q)quit",
        });

        this.right = blessed.box({
            width: "40%",
            left: "60%",
            padding: { top: 0, left: 1, right: 1, bottom: 0 },
            valign: "bottom",
            align: "right",
            content: "Saito Top",
        });

        this.component = blessed.box({
            top: "90%",
            valign: "bottom",
            autoPadding: false,
            padding: 0,
            bottom: "0",
            left: "0",
        });

        this.component.append(this.left);
        this.component.append(this.right);
    }
}