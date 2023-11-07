const log = require("debug")("saitotop:ui");
const blessed = require("blessed");
// const contrib = require("blessed-contrib");
const timeago = require("./timeago").default;

export default class UI {
    constructor() {
        log("Initializing UI");
        this.data = {};
        this.interval = null;
        this.setup();
    }

    setup() {
        this.screen = blessed.screen();

        this.events_table = blessed.listtable({
            align: 'left',
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


        this.screen.append(this.events_table);
        this.screen.append(this.status_bar);

        this.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
            return process.exit(0);
        });

        this.tick();
    }

    tick() {
        this.status_bar.setContent(`Last updated ${new Date().toISOString()}`);
        this.updateData();
        this.screen.render();
    }

    start() {
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    setData(data) {
        this.data = data;
    }

    updateData() {
        const rows = [["Event", "Properties", "Date"]];
        const events = Object.keys(this.data);
        events.sort();
        for (const event of events) {
            rows.push([event, JSON.stringify(this.data[event].params).substring(0, 50), timeago(this.data[event].date)]);
        }
        this.events_table.setData(rows);
    }
}