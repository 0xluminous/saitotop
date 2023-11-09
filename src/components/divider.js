const blessed = require("blessed");
import Component from "./component";

export default class DividerComponent extends Component {

    constructor() {
        super();

        this.component = blessed.line({
            top: "160",
            orientation: "horizontal",
            width: "100%",
        });
    }
}