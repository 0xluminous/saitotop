const log = require("debug")("saitotop:ui");
const blessed = require("blessed");
// const contrib = require("blessed-contrib");
const timeago = require("./timeago").default;
const invert = require("invert-color");

export default class UI {
    constructor() {
        log("Initializing UI");
        this.data = {};

        this.setup();

        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    setup() {
        this.screen = blessed.screen();

        this.mining_box = blessed.box({
            top: "0%",
            height: "20%",
            padding: 1,
            tags: true,
            content: "Initializing...",
        });

        this.events_table = blessed.listtable({
            align: 'left',
            top: "20%",
            left: '0%',
            padding: { top: 0, left: 1, right: 0, bottom: 1 },
            width: '100%',
            height: '90%',
        });

        this.status_bar = blessed.box({
            top: "90%",
            valign: "bottom",
            padding: { top: 1, left: 1, right: 0, bottom: 0 },
            bottom: "0",
            left: "0",
        });


        this.screen.append(this.mining_box);
        this.screen.append(this.events_table);
        this.screen.append(this.status_bar);

        this.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
            return process.exit(0);
        });

        this.tick();
    }

    tick() {
        this.status_bar.setContent(`Last updated ${new Date().toISOString()}`);

        let content = "";
        if (this.data["blockchain::state"]) {
            content += `{bold}HEIGHT:  ${this.data["blockchain::state"]["params"]["block_count"]}{/bold}`;
        }

        if (this.data["mining::golden_tickets"]) {
            content += "\n";
            const target = this.data["mining::golden_tickets"]["params"]["current target"];
            const color1 = `#${target.substring(0, 6)}`;
            const color2 = invert(color1);
            content += `{bold}TARGET:  {${color1}-fg}{${color2}-bg}${this.data["mining::golden_tickets"]["params"]["current target"]}{/bold}{/${color2}-bg}{/${color1}-fg}`;
        }

        if (this.data["mining::golden_tickets"]) {
            content += "\n";

            if (this.data["mining::golden_tickets"]["params"]["miner_active"] === true) {
                content += '{bold}MINING:  {white-fg}{green-bg}YES{/bold}{/green-bg}{/white-fg}';
            } else {
                content += '{bold}MINING:  {white-fg}{red-bg}NO{/bold}{/red-bg}{/white-fg}';
            }
        }

        if (this.data["mempool:state"]) { // : saito bug
            content += "\n";
            content += `{bold}MEMPOOL: tx=${this.data["mempool:state"]["params"]["transactions"]} blk=${this.data["mempool:state"]["params"]["blocks_queue"]}{/bold}`;
        }

        this.mining_box.setContent(content);

        this.updateEventTableData();
        this.screen.render();
    }
    setData(data) {
        this.data = data;
    }

    updateEventTableData() {
        const rows = [];
        const headers = ["Event", "Properties", "Last Received"];
        const events = Object.keys(this.data);
        events.sort();
        for (const event of events) {
            rows.push([event, JSON.stringify(this.data[event].params).substring(0, 50), timeago(this.data[event].date)]);
        }
        if (rows.length > 0) {
            rows.unshift(headers);
        }

        this.events_table.setData(rows);
    }
}