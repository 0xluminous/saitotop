require("dotenv").config();
const log = require("debug")("saitotop:index");
const Stats = require("./stats").default;
const UI = require("./ui").default;

async function main() {
    const ui = new UI();
    const stats = new Stats(process.argv[2]);
    stats.onstat = (stat) => {
        ui.setData(stats.events);
    }
    stats.start();

    /*
    const stats_file = process.argv[2];

    log(`Initializing with ${stats_file}`);
    log(stats_file);
    */
}

main();
