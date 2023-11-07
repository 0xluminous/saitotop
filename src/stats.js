const log = require("debug")("saitotop:stats");
const fs = require("fs");
const Tail = require("tail").Tail;
const Parser = require("./parser").default;

export default class Stats {
    constructor(stats_file) {
        if (!stats_file) throw new Error("invalid stats file");
        if (!fs.existsSync(stats_file)) throw new Error("stats file does not exist");

        this.stats_file = stats_file;
        this.events = {};
    }

    start() {
        log("looping");

        if (this.tail) {
            this.tail.unwatch();
            this.tail = null;
        }

        this.tail = new Tail(this.stats_file, { fromBeginning: true });
        this.tail.on("line", this.processLine.bind(this));
    }

    processLine(line) {
        log("processing line");
        const parsed = Parser.parse(line);
        this.events[parsed.event] = parsed.params;
        log(line);
        this.tick();
    }

    tick() {
        console.log(this.events["mining::golden_tickets"]);
        // console.log(Object.keys(this.events));
    }
}
