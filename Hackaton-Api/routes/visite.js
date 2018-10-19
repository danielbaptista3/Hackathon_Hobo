const express = require('express');
const visiteRouter = express.Router();
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const visiteController = controllers.visite;

visiteRouter.use(bodyParser.json());

visiteRouter.get('/:idSDF/:idAssoc', function (req, res) {
    visiteController.getLast(req.params.idSDF, req.params.idAssoc, function (data, state) {
        if (state === false) {
            res.status(500).end();
            return;
        }
        if (state !== 0) {
            res.json(data).status(200).end();
            return;
        }
        res.status(404).end();
        return;
    });
});

visiteRouter.post('/create', function (req, res) {
    visiteController.create([req.body.date, req.body.description, req.body.idSDF, req.body.idAssoc], function (state) {
        if (state === true) {
            res.json(state).status(200).end();
            return;
        }
        res.status(500).end();
        return;
    });
});

module.exports = visiteRouter;
