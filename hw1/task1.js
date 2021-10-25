const getReverseString = str => {
    return str.split('').reverse().join('');
}

const writeString = str => {
    process.stdout.write(`${str}\n\n`);
}

const dataHandler = data => {
    const reverseStr = getReverseString(data.toString());

    writeString(reverseStr);
}

process.openStdin().addListener('data', dataHandler);
