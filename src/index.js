require("dotenv").config();
const Stats = require("./stats").default;
const UI = require("./ui").default;

async function main() {
    const ui = new UI();

    const stats_file = process.argv[2];
    Stats(stats_file, (stats) => {
        // console.log(stats);
        ui.setData(stats);
    });

    ui.start();
}

main();
