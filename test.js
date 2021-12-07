function today() {
    today = new Date();
    const date = [];
    date.push(today.getFullYear());
    date.push((String(today.getMonth() + 1).length < 2 ? '0' + String(today.getMonth() + 1) : today.getMonth() + 1));
    date.push((String(today.getDate()).length < 2) ? '0' + String(today.getDate()) : today.getDate());
    return date.join('-');
}