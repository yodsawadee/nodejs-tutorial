// `nodemon index` to execute this

const { logEvents, printMsgEvents } = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

// initialize object
const myEmitter = new MyEmitter();

// add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg));

// Emit log event
myEmitter.emit('log', 'Log event emitted! immediately before setTimeout()');
setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted! with delay');
}, 2000);
myEmitter.emit('log', 'Log event emitted! immediately after setTimeout()');


// add listener for the printMsg event
myEmitter.on('printMsg', (msg1, msg2) => printMsgEvents(msg1, msg2));
// Emit printMsg event
myEmitter.emit('printMsg','print 1st message','print 2nd message');