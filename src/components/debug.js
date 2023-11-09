const blessed = require("blessed");
import Component from "./component";

export default class DebugComponent extends Component {

    constructor() {
        super();

        this.component = blessed.box({
            width: "50%",
            height: "70%",
            left: "25%",
            right: "25%",
            top: "15%",
            bottom: "15%",
            mouse: true,
            scrollable: true,
            draggable: true,
            hidden: true,
            border: "line",
            label: "Debug",
            tags: true,
            padding: 1,
        });

        this.i = 0;
    }

    toggle() {
        if (this.component.visible) {
            this.component.hide();
        } else {
            this.component.show();
        }
    }

    render(data) {
        if (!data || !data.stats) {
            return;
        }

        const events = Object.keys(data.stats);
        events.sort();

        let content = "";
        for (const event of events) {
            content += `{bold}${event}{/bold}\n`;
            const stats = data.stats[event].stats;
            for (const stat in stats) {
                content += `${stat}: ${stats[stat].value}\n`;
            }

            content += "\n\n";
        }
        this.component.setContent(content);
    }
}