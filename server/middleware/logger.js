const format = require('date-fns/format');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { log } = require('console');

const logEvent = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
    } catch (error) {
        console.log(error);
    }

};


const logger = (req, res, next) => {
    logEvent(`${req.method}\t${req.url}\t${req.header.origin}`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports = { logger, logEvent };