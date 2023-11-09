const blessed = require("blessed");
import Component from "./component";

export default class ConfigComponent extends Component {

    constructor() {
        super();

        this.component = blessed.box({
            top: "0%",
            height: "190",
            align: "right",
            left: "75%",
            width: "25%",
            padding: { top: 1, left: 1, right: 1, bottom: 0 },
            tags: true,
        });
    }

    render(data) {
        if (!data.active || !data.config) {
            this.component.hide();
            return;
        }

        this.component.show();

        let content = "";

        const nodeaddr = `${data.config.server.protocol}://${data.config.server.host}:${data.config.server.port}`;
        content += `{bold}{white-fg}${nodeaddr}{/white-fg} (me)  {/bold}`;

        for (const peer of data.config.peers) {
            const peeraddr = `${peer.protocol}://${peer.host}:${peer.port}`;
            content += `\n{white-fg}${peeraddr}{/white-fg} (${peer.synctype})`;
        }

        this.component.setContent(content);
    }
}