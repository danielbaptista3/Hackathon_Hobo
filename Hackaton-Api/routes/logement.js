const express = require('express');
const logementRouter = express.Router();
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const logementController = controllers.logement;

logementRouter.use(bodyParser.json());

logementRouter.get('/:id', function (req, res) {
    logementController.getById(req.params.id, function (data, state) {
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

logementRouter.get('/all', function (req, res) {
    logementController.getAll(function (data, state) {
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

logementRouter.post('/create', function (req, res) {
    logementController.create([req.body.address, req.body.price, req.body.city, req.body.cp, req.body.area, req.body.available, req.body.idAsso], function (state) {
        if (state === true) {
            res.json(state).status(200).end();
            return;
        }
        res.status(500).end();
        return;
    });
});

logementRouter.put('/update/:id', function (req, res) {
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

logementRouter.delete('/delete/:id', function (req, res) {
    logementController.deleteById(req.params.id, function (state) {
        if (state === true) {
            res.json(state).status(200).end();
            return;
        }
        res.status(500).end();
        return;
    });
});


module.exports = logementRouter;
