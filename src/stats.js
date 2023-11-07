const log = require("debug")("saitotop:stats");
const fs = require("fs");
const Tail = require("tail").Tail;
const Parser = require("./parser").default;

export default function Stats(stats_file, callback) {
    if (!stats_file) throw new Error("invalid stats file");
    if (!fs.existsSync(stats_file)) throw new Error("stats file does not exist");

    const stats = {};

    const tail = new Tail(stats_file, { fromBeginning: true });
    tail.on("line", (line) => {
        const stat = Parser.parse(line);
        stats[stat.event] = stat;
        callback(stats);
    });
}

// todo: errors are incredibly hard to debug...at least add logging or fix exceptions
// todo: bug where key names get messed up...try to detect and fix
// todo: store date for each event
// todo: parse event params even further (into type)
// todo: parse _0 _1 _2 events into an array