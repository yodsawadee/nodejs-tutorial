// `node files-simple` to execute this

const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8');
        console.log(data);
        // // delete file
        // await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));

        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\nNice to meet you.');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'newPromiseWrite.txt'));

        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'newPromiseWrite.txt'), 'utf-8');
        console.log(newData);
    } catch (err) {
        console.log(err)
    }
}

fileOps();


// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you.', (err) => {
//     if (err) throw err;
//     console.log('Write complete');

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\ntest append', (err) => {
//         if (err) throw err;
//         console.log('Append complete');

//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
//             if (err) throw err;
//             console.log('Rename complete');
//         })
//     })
// })


// // fs.readFile('./files/starter.txt', 'utf-8', (err, data) => {
// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })

// console.log('Hello...');

// process.on('uncaughtException', err => {
//     console.error(`There was an uncaught error: ${err}`);
//     process.exit(1);
// })

// // write new
// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you.', (err) => {
//     if (err) throw err;
//     console.log('Write complete');
// })

// // modify existing <== recommed
// fs.appendFile(path.join(__dirname, 'files', 'combine.txt'), '\ntest append', (err) => {
//     if (err) throw err;
//     console.log('Append complete');
// })

// fs.rename(path.join(__dirname, 'files', 'combine.txt'), path.join(__dirname, 'files', 'newCombine.txt'), (err) => {
//     if (err) throw err;
//     console.log('Rename complete');
// })