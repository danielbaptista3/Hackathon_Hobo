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

app.use(CookieParser());
app.use(morgan('start'));
app.use(cors(corsOptions));

RouterManager.attach(app);
app.listen(8080, function(){
    console.log('Connected on api...');
});