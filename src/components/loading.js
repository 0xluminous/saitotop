const blessed = require("blessed");
import Component from "./component";

export default class LoadingComponent extends Component {

    constructor() {
        super();

        this.show_active = false;
        this.content = "{bold}SAITO TOP{/bold}\n\n   Waiting for data";

        this.component = blessed.box({
            width: "100%",
            height: "100%",
            align: "center",
            valign: "middle",
            tags: true,
            padding: 1,
            content: this.content,
        });

        this.i = 0;
    }

    render(data) {
        if (!super.render(data)) return;

        if (++this.i > 3) {
            this.i = 0;
        }

        const dots = ".".repeat(this.i);
        const filler = " ".repeat(3 - this.i);
        this.component.setContent(`${this.content}${dots}${filler}`);
    }
}