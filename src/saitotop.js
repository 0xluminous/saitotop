const path = require("path");
const fs = require("fs");

const Tail = require("tail").Tail;

import Parser from "./parser";

export default function SaitoTop(dir, callback) {
    const saito = {
        dir,
        config_dir: path.join(dir, "configs"),
        data_dir: path.join(dir, "data"),

        config: null,
        stats: {},

        active: false,
    };

    function updateStat(stat) { // ಠ_ಠ
        const event = stat.event;
        if (saito.stats[event]) {
            const old = saito.stats[event];
            for (const key in stat.stats) {
                if (!old.stats[key] || old.stats[key].value !== stat.stats[key].value) {
                    let last_value = null;
                    if (old.stats[key]) {
                        last_value = saito.stats[event].stats[key].value;
                    }
                    saito.stats[event].stats[key] = stat.stats[key];
                    saito.stats[event].stats[key].last_value = last_value;
                }
            }
        } else {
            saito.stats[event] = stat;
        }
    }

    saito.config_file = path.join(saito.config_dir, "config.json");
    saito.stats_file = path.join(saito.data_dir, "saito.stats");

    if (!fs.existsSync(saito.dir)) throw new Error(`Saito directory '${saito.dir}' does not exist`);
    if (!fs.existsSync(saito.config_dir)) throw new Error(`Config directory '${saito.config_dir}' does not exist`);
    if (!fs.existsSync(saito.data_dir)) throw new Error(`Data directory '${saito.data_dir}' does not exist`);
    if (!fs.existsSync(saito.config_file)) throw new Error(`Config file '${saito.config_file}' does not exist`);
    if (!fs.existsSync(saito.stats_file)) throw new Error(`Saito Stats '${saito.stats_file}' does not exist`);

    saito.config = JSON.parse(fs.readFileSync(saito.config_file));

    const tail = new Tail(saito.stats_file, { fromBeginning: false });
    tail.on("line", (line) => {
        saito.active = true;
        updateStat(Parser.parse(line));
        callback(saito);
    });
}
