import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

export default function (date = null) {
    if (!date) return "unknown";
    return timeAgo.format(date, "mini");
}
