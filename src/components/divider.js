const blessed = require("blessed");

export default class DividerComponent {

    constructor() {
        this.component = blessed.line({
            top: "160",
            orientation: "horizontal",
            width: "100%",
        });
    }

    render(data) {
        if (!data.active) {
            this.component.hide();
            return;
        }

        this.component.show();
    }
}