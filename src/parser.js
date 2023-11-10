export default class Parser {
    static parse(line) {
        const parsed = { stats: {} };

        // saito bugs
        line = line.replace("--- stats ------ ", "");
        line = line.replace("mempool:state", "mempool::state");
        line = line.replace("routing:sync_state", "routing::sync_state");

        const [event, rest] = line.split(/\s+-\s+/);
        parsed.event = event;

        const params = rest.split(/\s*\,\s*/);
        for (const param of params) {
            let [key, value] = param.split(/\s*\:\s*/);

            parsed["stats"][key] = { date: new Date() };

            value = value.replace(" full_block_count", ""); // hack

            try {
                parsed["stats"][key]["value"] = JSON.parse(value);
            } catch (e) {
                parsed["stats"][key]["value"] = value;
            }
        }

        return parsed;
    }
}