const express = require('express');
const RouterManager = require('./routes');
const morgan = require('morgan');
const config = require('./config');
const CookieParser = require('cookie-parser');
const cors = require('cors');



var corsOptions = {
    origin: 'http://localhost:3000',
    credentials:  true
}

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(CookieParser());
app.use(morgan('start'));

RouterManager.attach(app);
app.listen(8080, function(){
    console.log('Connected on api...');
});