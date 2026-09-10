export const formatDate = (
    value: string
): string => {
    if (!value) {
        return "Not specified";
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return value;
    }

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const year =
        date.getFullYear();

    return `${day}/${month}/${year}`;
};

export const formatRelativeTime = (
    value: string
): string => {
    if (!value) {
        return "";
    }

    const created =
        new Date(value);

    if (
        Number.isNaN(
            created.getTime()
        )
    ) {
        return value;
    }

    const now =
        Date.now();

    const diffInSeconds =
        Math.floor(
            (
                now -
                created.getTime()
            ) / 1000
        );

    if (diffInSeconds < 0) {
        return "Just now";
    }

    if (diffInSeconds < 60) {
        return "Just now";
    }

    const minutes =
        Math.floor(
            diffInSeconds / 60
        );

    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours =
        Math.floor(
            minutes / 60
        );

    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days =
        Math.floor(
            hours / 24
        );

    if (days < 7) {
        return `${days}d ago`;
    }

    const weeks =
        Math.floor(
            days / 7
        );

    if (weeks < 4) {
        return `${weeks}w ago`;
    }

    return formatDate(value);
};