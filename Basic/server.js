// Learning NodeJS
// Node runs on a server - not in a browser (backend not frontend)

// `node server` to execute this

// console.log('hello world')
// console.log(global)

// const os = require('os')
// const path = require('path')

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))

// console.log(path.parse(__filename))


const math = require('./math')
console.log(math.add(2,3))

const { add, subtract, multiply, divide } = require('./math')
console.log(add(2,3))
console.log(subtract(2,3))








