const extractNumbers = (start, end) => {
    const values = [];
    for (let i = parseInt(start.substring(start.length - 3), 10); i <= parseInt(end.substring(end.length - 3), 10); i++) {
        values.push(start.substring(0, start.length - 3) + i.toString().padStart(3, '0'));
    }
    return values;
};

module.exports = { extractNumbers };
