// const log = require("debug")("saitotop:ui");
const blessed = require("blessed");
import LoadingComponent from "./components/loading";
import EventsTableComponent from "./components/events_table";
import StatusbarComponent from "./components/statusbar";
import DividerComponent from "./components/divider";
import DebugComponent from "./components/debug";
import SummaryComponent from "./components/summary";
import ConfigComponent from "./components/config";
import NetworkingComponent from "./components/networking";
import RoutingComponent from "./components/routing";
import ConsensusComponent from "./components/consensus";
import VerificationComponent from "./components/verification";
import MiningComponent from "./components/mining";
import WalletComponent from "./components/wallet";
import BlockchainComponent from "./components/blockchain";

export default class UI {
    constructor() {
        this.data = { loaded: false };
        this.components = [];
        this.setup();
    }

    setup() {
        this.screen = blessed.screen({
            log: "debug",
            debug: true,
            dump: true,
        });

        const debug = new DebugComponent();
        this.components = [
            new LoadingComponent(),
            new SummaryComponent(),
            new ConfigComponent(),
            new DividerComponent(),
            new NetworkingComponent(),
            new RoutingComponent(),
            new VerificationComponent(),
            new ConsensusComponent(),
            new MiningComponent(),
            new BlockchainComponent(),
            new WalletComponent(),
            new StatusbarComponent(),
            debug,
        ];

        for (const component of this.components) {
            this.screen.append(component.component);
        }

        this.screen.key(['escape', 'q', 'C-c'], function () {
            return process.exit(0);
        });

        this.screen.key(['d'], function () {
            debug.toggle();
        });

        this.runloop();
    }

    runloop() {
        setInterval(() => {
            this.render();
        }, 1000);

        this.render();
    }

    render() {
        for (const component of this.components) {
            component.render(this.data);
        }

        this.screen.render();
    }

    update(data) {
        this.data = data;
        this.render();
    }
}