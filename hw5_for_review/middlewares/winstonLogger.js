const winston = require('winston');
const { format, configure } = winston;
const { combine, timestamp, printf } = format;
const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

configure({
    format: combine(
        timestamp(),
        customFormat
    ),
    transports: [
        new (winston.transports.File)({ filename: 'winston.info.log', level: 'info' }),
        new (winston.transports.File)({ filename: 'winston.warn.log', level: 'warn' }),
        new (winston.transports.File)({ filename: 'winston.error.log', level: 'error' })
    ]
});

export { winston };
