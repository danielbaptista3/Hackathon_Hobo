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

var cluster = require('cluster');

var workers = process.env.WORKERS || require('os').cpus().length;

if (cluster.isMaster) {

    console.log('start cluster with %s workers', workers);

    for (var i = 0; i < workers; ++i) {
        var worker = cluster.fork().process;
        console.log('worker %s started.', worker.pid);
    }

    cluster.on('exit', function(worker) {
        console.log('worker %s died. restart...', worker.process.pid);
        cluster.fork();
    });

} else {

    RouterManager.attach(app);
    app.listen(8080, function(){
        console.log('Connected on api...');
    });

}

process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
})

