export default class Parser {
    static parse(line) {
        const parsed = { params: {} };

        line = line.replace("--- stats ------ ", ""); // saito bug

        const [event, rest] = line.split(/\s+-\s+/);
        parsed.event = event;

        const params = rest.split(/\s*\,\s*/);
        for (const param of params) {
            const [key, value] = param.split(/\s*\:\s*/);
            parsed.params[key] = value;
            parsed.date = new Date();
        }

        return parsed;
    }
}