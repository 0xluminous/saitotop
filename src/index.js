require("dotenv").config();
const log = require("debug")("saitotop:index");
const Stats = require("./stats").default;
const UI = require("./ui").default;

async function main() {
    const ui = new UI();

    const stats_file = process.argv[2];
    Stats(stats_file, (stats) => {
        ui.setData(stats);
    });

    ui.start();
}

main();
