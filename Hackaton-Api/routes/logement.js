const express = require('express');
const logementRouter = express.Router();
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const logementController = controllers.logement;

logementRouter.use(bodyParser.json());

logementRouter.get('/:id', function (req, res) {
    logementController.findOne(req.params.id, function (data, state) {
        if (state === false) {
            res.status(500).end();
        }
        if (data !== 0) {
            data = JSON.parse(data);
            res.json(data).status(200);
        }
        res.status(404).end();
    });
});

logementRouter.get('/', function (req, res) {
    logementController.findAll(function (data, state) {
        if (state === false) {
            res.status(500).end();
        }
        if (data !== 0) {
            data = JSON.parse(data);
            res.json(data).status(200);
        }
        res.status(404).end();
    });
});

logementRouter.post('/', function (req, res) {
    logementController.create([req.body.adresse, req.body.price, req.body.city, req.body.cp, req.body.area, req.body.available, /* TODO session.idAssociation */], function (state) {
        if (state === true) {
            res.json(state).status(200).end();
            return;
        }
        res.status(500).end();
        return;
    });
});

logementRouter.post('/update/:id', function (req, res) {
    if (Number.parseInt(req.params.id)) {
        var values = []
        var columns = []

        for (var key in req.body) {
            values.push(req.body[key]);
            columns.push(key);
        }
        logementController.update(columns, values, req.params.id, function (state) {
            if (state === true) {
                res.json(state).status(200).end();
                return;
            }
            res.status(500).end();
            return;
        });
    }
    else {
        res.json("parameter is not an integer").status(500).end();
    }
});

logementRouter.post('/delete/:id', function (req, res) {
    logementController.delete(req.params.id, function (state) {
        if (state === true) {
            res.json(state).status(200).end();
            return;
        }
        res.status(500).end();
        return;
    });
});


module.exports = logementRouter;
