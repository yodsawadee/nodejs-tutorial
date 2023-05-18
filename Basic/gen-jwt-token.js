// `node gen-jwt-token` to execute this

const crypto = require('crypto');
const accessToken = crypto.randomBytes(64).toString('hex');
const refreshToken = crypto.randomBytes(64).toString('hex');
console.log('accessToken=',accessToken)
console.log('refreshToken=',refreshToken)