const blessed = require("blessed");
const { timeago } = require("../utils");

export default class EventsTableComponent {

    constructor() {
        this.component = blessed.listtable({
            align: 'left',
            top: "20%",
            left: '0%',
            padding: { top: 0, left: 1, right: 0, bottom: 1 },
            width: '100%',
            height: '90%',
        });
    }

    updateData(data) {
        const rows = [];
        const headers = ["Event", "Properties", "Last Received"];
        const events = Object.keys(data);
        events.sort();

        for (const event of events) {
            rows.push([event, JSON.stringify(data[event].stats).substring(0, 50), "0s"]);
        }

        if (rows.length > 0) {
            rows.unshift(headers);
        }

        this.component.setData(rows);
    }

    render(data) {
        if (!data.active) {
            this.component.hide();
            return;
        }

        this.component.show();
        this.updateData(data.stats);
    }
}