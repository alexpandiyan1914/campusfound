export const formatRelativeTime = (date: string) => {

    const now = new Date().getTime();

    const created = new Date(date).getTime();

    const diff = Math.floor((now - created) / 1000);

    if (diff < 60)
        return "Just now";

    if (diff < 3600)
        return `${Math.floor(diff / 60)} min ago`;

    if (diff < 86400)
        return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? "s" : ""} ago`;

    if (diff < 604800)
        return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`;

    if (diff < 2592000)
        return `${Math.floor(diff / 604800)} week${Math.floor(diff / 604800) > 1 ? "s" : ""} ago`;

    return `${Math.floor(diff / 2592000)} month${Math.floor(diff / 2592000) > 1 ? "s" : ""} ago`;

};