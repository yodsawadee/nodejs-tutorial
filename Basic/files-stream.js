// `node files-stream` to execute this

const fs = require('fs');
const path = require('path');
const rs = fs.createReadStream(path.join(__dirname, 'files', 'lorem.txt'), 'utf-8');
const ws = fs.createWriteStream(path.join(__dirname, 'files', 'newLorem.txt'));

// rs.on('data', (data) => {
//     console.log(data);
//     ws.write(data);
// })

rs.pipe(ws);