require("dotenv").config();
const log = require("debug")("saitotop:index");
const Stats = require("./stats").default;

async function main() {
    const stats = new Stats(process.argv[2]);
    stats.start();
    /*
    const stats_file = process.argv[2];

    log(`Initializing with ${stats_file}`);
    log(stats_file);
    */
}

main();
