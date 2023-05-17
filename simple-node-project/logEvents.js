const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

// const uuid = require('uuid');
// console.log(uuid.v4())

const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd HH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}`;
    console.log(logItem);

    try {
        const logDirPath =  path.join(__dirname, 'logs');
        if(!fs.existsSync(logDirPath)) {
            await  fsPromises.mkdir(logDirPath);
        }
        const eventLogPath =  path.join(logDirPath, 'eventLog.txt');
        if(!fs.existsSync(eventLogPath)) {
            await fsPromises.appendFile(eventLogPath, logItem);
        } else {
            await fsPromises.appendFile(eventLogPath, '\n'+logItem);
        }
    } catch (err) {
        console.log(err);
    }
}

const printMsgEvents = async (message1, message2) => {
    console.log(message1+' | '+message2);
}

module.exports = { logEvents, printMsgEvents };