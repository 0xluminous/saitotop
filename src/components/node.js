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