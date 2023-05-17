const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})

router.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
})

router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'new-page.html'); // 302 by default
})

// // Route handlers
// app.get('/hello(.html)?', (req, res, next) => {
//     console.log('attempted to load hello.html');
//     next();
// }, (req, res) => {
//     res.send('Hello World!');
// })

// // chaining route handlers
// const one = (req, res, next) => {
//     console.log('one');
//     next();
// }
// const two = (req, res, next) => {
//     console.log('two');
//     next();
// }
// const three = (req, res, next) => {
//     console.log('three');
//     res.send('Finished!');
// }
// app.get('/chain(.html)?', [one, two, three]);

module.exports = router;