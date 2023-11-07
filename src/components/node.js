const blessed = require("blessed");

export default class NodeComponent {

    constructor() {
        this.component = blessed.box({
            top: "0%",
            height: "20%",
            align: "right",
            left: "80%",
            width: "20%",
            padding: { top: 0, left: 1, right: 1, bottom: 0 },
            tags: true,
        });
    }

    render(data) {
        if (!data.active) {
            this.component.hide();
            return;
        }

        this.component.show();

        let content = "";

        content += `{bold}127.0.0.1:12101 (me)  {/bold}`;
        content += `\nsaito.io:443 (full)`;

        this.component.setContent(content);
    }
}