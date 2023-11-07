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
        this.tail.on("line", this.process.bind(this));
    }

    process(line) {
        log("processing line");
        const parsed = Parser.parse(line);
        this.events[parsed.event] = parsed.params;
        this.onstat(parsed);
    }

    onstat(stat) {
        log(stat);
    }
}

// todo: store date for each event
// todo: parse event params even further (into type)
// todo: parse _0 _1 _2 events into an array