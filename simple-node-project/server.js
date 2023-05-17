const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logEvents, logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

const whitelist = ['http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    OptionsSuccessStatus: 200
}
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// buile-in middleware to handle urlencoded data or form data: 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));
// buile-in middleware for json
app.use(express.json());
// serve static file
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

app.all('/*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found"});
    } else {
        res.type('text').send("404 Not Found");
    }
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));