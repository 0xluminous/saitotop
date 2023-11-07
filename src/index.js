require("dotenv").config();
import SaitoTop from "./saitotop"
// const Stats = require("./stats").default;
// const UI = require("./ui").default;

async function main() {

    SaitoTop(process.argv[2], (saito) => {
        console.log(Object.keys(saito.stats));
    });

    /*
    // const ui = new UI();
    const stats_file = process.argv[2];
        ui.setData(stats);
    });
    */
}

main();

// todo: could read in entire saito-node directory...could then read config, saito stats and even a standard log file
// - what is my config?
// - what are peers?
// - errors
// maybe not log file...only really useful is peer data...config is interesting though

// todo: create another view that shows raw debug JSON.
// todo: by default "productize" all info...only show what is useful, put rest in raw debug view

// todo: errors are incredibly hard to debug...at least add logging or fix exceptions
// todo: make it easier to scan rest of event values...format them nicely...color values so you know when they change? true/false, numbers...we have min and max range
// todo: abstract out messages...don't want to access with JSON...want JS objects
// todo: might be helpful to know when a value changes, versus when new event came in...
// todo: bug where key names get messed up...try to detect and fix
// todo: store date for each event
// todo: parse event params even further (into type)
// todo: parse _0 _1 _2 events into an array