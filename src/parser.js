export default class Parser {
    static parse(line) {
        const parsed = { params: {} };

        // saito bugs
        line = line.replace("--- stats ------ ", "");
        line = line.replace("mempool:state", "mempool::state");

        const [event, rest] = line.split(/\s+-\s+/);
        parsed.event = event;

        const params = rest.split(/\s*\,\s*/);
        for (const param of params) {
            const [key, value] = param.split(/\s*\:\s*/);
            try {
                parsed.params[key] = JSON.parse(value);
            } catch (e) {
                parsed.params[key] = value;
            }
            parsed.date = new Date();
        }

        return parsed;
    }
}