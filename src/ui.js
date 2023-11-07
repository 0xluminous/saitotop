// const log = require("debug")("saitotop:ui");
const blessed = require("blessed");
// const contrib = require("blessed-contrib");
// const invert = require("invert-color");
import LoadingComponent from "./components/loading";
import EventsTableComponent from "./components/events_table";
import StatusbarComponent from "./components/statusbar";
import NetworkComponent from "./components/network";
import NodeComponent from "./components/node";

export default class UI {
    constructor() {
        this.data = { loaded: false };
        this.components = [];
        this.setup();
    }

    setup() {
        this.screen = blessed.screen({
            log: "debug",
            debug: true,
            dump: true,
        });

        this.components = [
            new LoadingComponent(),
            new NetworkComponent(),
            new NodeComponent(),
            new EventsTableComponent(),
            new StatusbarComponent(),
        ];

        for (const component of this.components) {
            this.screen.append(component.component);
        }

        this.screen.key(['escape', 'q', 'C-c'], function () {
            return process.exit(0);
        });

        this.runloop();
    }

    runloop() {
        setInterval(() => {
            this.render();
        }, 1000);

        this.render();
    }

    render() {
        for (const component of this.components) {
            component.render(this.data);
        }

        this.screen.render();
    }

    update(data) {
        this.data = data;
        this.render();
    }
}