const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd HH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}`;
    console.log(logItem);

    try {
        const logDirPath =  path.join(__dirname, '..', 'logs');
        if(!fs.existsSync(logDirPath)) {
            await  fsPromises.mkdir(logDirPath);
        }
        const eventLogPath =  path.join(logDirPath, logName);
        if(!fs.existsSync(eventLogPath)) {
            await fsPromises.appendFile(eventLogPath, logItem);
        } else {
            await fsPromises.appendFile(eventLogPath, '\n'+logItem);
        }
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method} ${req.headers.origin} ${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logEvents, logger };