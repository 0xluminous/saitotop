const blessed = require("blessed");
// const contrib = require("blessed-contrib");
const { timeago } = require("../utils");

export default class EventsTableComponent {

    constructor() {
        this.component = blessed.listtable({
            align: 'left',
            top: "200",
            tags: true,
            left: '0%',
            scrollable: true,
            mouse: true,
            padding: { top: 0, left: 1, right: 0, bottom: 1 },
            width: '100%',
            height: '95%'
        });
    }

    render(data) {
        if (!data.active) {
            this.component.hide();
            return;
        }

        this.component.show();
        this.renderData(data.stats);
    }

    renderData(data) {
        const rows = [];
        const headers = ["Event", "Stat".padStart(20, " "), "Value", "Stat".padStart(20, " "), "Value"];
        const events = Object.keys(data);
        events.sort();

        for (const event of events) {
            if (["mempool::state"].indexOf(event) !== -1) continue;
            rows.push(this.renderRow(data[event]));
        }

        if (rows.length > 0) {
            rows.unshift(headers);
        }

        this.component.setData(rows);
    }

    renderRow(row) {
        const event = row.event;
        const cols = [event];

        for (const stat in row.stats) {
            if (["max_rate", "min_rate", "miner_active", "block_count", "current target", "current_balance"].indexOf(stat) !== -1) continue;
            cols.push(stat.padStart(20, " "));
            const last_value = row.stats[stat].last_value ? `${row.stats[stat].last_value} ` : "";
            cols.push(`{white-fg}${row.stats[stat].value}{/white-fg} {gray-fg}${last_value}${timeago(row.stats[stat].date)} ago{/gray-fg}`);
        }

        while (cols.length < 5) {
            if (cols.length % 2 === 0) {
                cols.push("-");
            } else {
                cols.push("-".padStart(20, " "));
            }
        }

        return cols;
    }



}