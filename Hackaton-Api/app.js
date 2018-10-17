const express = require('express');
const RouterManager = require('./routes');
const morgan = require('morgan');
const config = require('./config');
const CookieParser = require('cookie-parser');
const controllers = require('./controllers');
const anthenticateController = controllers.authenticate;
const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials:  true
}

const app = express();
app.use(CookieParser());
app.use(morgan('dev'));
app.set('secret', config.secret);
app.use(cors(corsOptions));

app.get('/', function(req, res) {
    anthenticateController.check(function(data){
        data = JSON.parse(data);
        if(data.length !== 0){
            res.json(data).status(200);
            return;
        }
        res.status(404).end();
    });
});

RouterManager.attach(app);
app.listen(8080, function(){
    console.log('Connected on api...');
});