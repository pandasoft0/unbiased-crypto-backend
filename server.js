const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var mongoose = require('mongoose');
const DB = require('./config/db');
const app = express();

// Simple request time logger
app.use((req, res, next) => {
    console.log("A new request received at " + Date.now());

    // This function call tells that more processing is
    // required for the current request and is in the next middleware
    //function/route handler.
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static('public'));

app.use('/static', express.static('public'));

app.use(
    session({
        secret: 'arbitary-string',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    })
)

console.log(DB.DBuri);

app.get('/home', (req, res) => {
    res.send('Home Page');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));