// `node gen-jwt-token` to execute this

const crypto = require('crypto');
const accessToeken = crypto.randomBytes(64).toString('hex');
const refreshToeken = crypto.randomBytes(64).toString('hex');
console.log('accessToeken=',accessToeken)
console.log('refreshToeken=',refreshToeken)