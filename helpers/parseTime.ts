function parseTime(timeString: string): Date {
    const hour = parseInt(timeString.slice(0, 2));
    const minute = parseInt(timeString.slice(2, 4));
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date;
}

function formatTime(date: Date): string {
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return hour + minute;
}


export { parseTime, formatTime };