import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-US')

export function timeago(date = null) {
    if (!date) return "unknown";
    return timeAgo.format(date, "mini");
}

export function truncateHash(hash, length = 4) {
    if (hash.length <= length * 2) {
        return hash;
    }
    return hash.substr(0, length) + '…' + hash.substr(-length);
}

export function getRandomColor() {
    const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

export function stringToColor(hashString) {
    let hash = 0;
    for (let i = 0; i < hashString.length; i++) {
        const char = hashString.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
    const index = Math.abs(hash) % colors.length;
    return colors[index];
}

