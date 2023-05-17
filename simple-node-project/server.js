const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {};
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(filePath, !contentType.includes('image') ? 'utf8' : '');
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        response.writeHead(filePath.includes('404.html') ? 404 : 200, { 'Content-Type': contentType });
        response.end(contentType === 'application/json' ? JSON.stringify(data) : data);
    } catch (err) {
        console.log(err);
        myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log('req.url=', req.url);
    console.log('req.method=', req.method);

    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    const extension = path.extname(req.url);
    let contentType;
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath;
    if (contentType === 'text/html') {
        if (req.url === '/') {
            // ex. http://localhost:3500 or http://localhost:3500/
            filePath = path.join(__dirname, 'views', 'index.html');
        } else if (req.url.slice(-1) === '/') {
            // ex. http://localhost:3500/index/ or http://localhost:3500/subdir/
            filePath = path.join(__dirname, 'views', req.url, 'index.html');
        } else {
            // ex. http://localhost:3500/index or http://localhost:3500/subdir/test
            filePath = path.join(__dirname, 'views', req.url);
        }
    } else {
        // ex. http://localhost:3500/data/data.json
        filePath = path.join(__dirname, req.url);
    }
    
    // makes .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
        // serve the file
        serveFile(filePath, contentType, res);
    } else {
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page' }); // 301 redirect
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                // serve not found page
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }

    console.log('===== end creating server =====');
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));