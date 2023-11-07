const log = require("debug")("saitotop:ui");
const blessed = require("blessed");
const contrib = require("blessed-contrib");
const timeago = require("./timeago").default;

export default class UI {
    constructor() {
        log("Initializing UI");
        this.data = {};
        this.interval = null;
        this.setup();
    }

    setup() {
        this.screen = blessed.screen();

        this.events_table = blessed.listtable({
            align: 'left',
            left: '0%',
            padding: { top: 0, left: 1, right: 0, bottom: 1 },
            width: '100%',
            height: '90%',
        });

        this.status_bar = blessed.box({
            top: "90%",
            valign: "bottom",
            padding: { top: 1, left: 1, right: 0, bottom: 0 },
            bottom: "0",
            left: "0",
        });


        this.screen.append(this.events_table);
        this.screen.append(this.status_bar);

        this.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
            return process.exit(0);
        });

        this.tick();
    }

    tick() {
        this.status_bar.setContent(`Last updated ${new Date().toISOString()}`);
        this.updateData();
        this.screen.render();
    }

    start() {
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    setData(data) {
        this.data = data;
    }

    updateData() {
        const rows = [["Event", "Properties", "Date"]];
        const events = Object.keys(this.data);
        events.sort();
        for (const event of events) {
            rows.push([event, JSON.stringify(this.data[event].params).substring(0, 50), timeago(this.data[event].date)]);
        }
        this.events_table.setData(rows);

        /*
        this.events_table.setData([
            ['Column 10', 'Column 20', 'Column 30'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
            // ... more rows
        ]);
        */

        // this.tick();
    }
}

/*
setInterval(function () {
    ui.tick();
}, 200);
*/

/*
program.on('mouse', function (data) {
    if (data.action === 'mouseup') return;
    program.move(1, program.rows);
    program.eraseInLine('right');
    if (data.action === 'wheelup') {
        program.write('Mouse wheel up at: ' + data.x + ', ' + data.y);
    } else if (data.action === 'wheeldown') {
        program.write('Mouse wheel down at: ' + data.x + ', ' + data.y);
    } else if (data.action === 'mousedown' && data.button === 'left') {
        program.write('Left button down at: ' + data.x + ', ' + data.y);
    } else if (data.action === 'mousedown' && data.button === 'right') {
        program.write('Right button down at: ' + data.x + ', ' + data.y);
    } else {
        program.write('Mouse at: ' + data.x + ', ' + data.y);
    }
    program.move(data.x, data.y);
    program.bg('red');
    program.write(' ');
    program.bg('!red');
});

program.on('focus', function () {
    program.move(1, program.rows);
    program.write('Gained focus.');
});

program.on('blur', function () {
    program.move(1, program.rows);
    program.write('Lost focus.');
});

program.alternateBuffer();
program.enableMouse();
program.hideCursor();
program.clear();

program.move(1, 1);
program.bg('black');
program.write('Hello world', 'blue fg');
program.setx((program.cols / 2 | 0) - 4);
program.down(5);
program.write('Hi again!');
program.bg('!black');
program.feed();

program.getCursor(function (err, data) {
    if (!err) {
        program.write('Cursor is at: ' + data.x + ', ' + data.y + '.');
        program.feed();
    }

    program.charset('SCLD');
    program.write('abcdefghijklmnopqrstuvwxyz0123456789');
    program.charset('US');
    program.setx(1);
});

*/