const express = require('express');
const personneRouter = express.Router();
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const personneController = controllers.personne;

personneRouter.use(bodyParser.json());

// TODO
personneRouter.get('/zone/:zone', function (req, res) {
    personneController.getByZone(req.params.zone, function (data, state) {
        if (state === false) {
            res.status(500).end();
        }
        if (data !== 0) {
            data = JSON.parse(data);
            res.json(data).status(200)
        }
        res.status(404).end();
    });
});

personneRouter.post('/:latitude/:longitude', function (req, res) {
    personneController.create([req.body.lastName, req.body.firstName, req.params.latitude, req.params.longitude, req.body.description, req.body.genre, req.body.self], function (state) {
        if (state === true) {
            res.json(state).status(200).end();
            return;
        }
        res.status(500).end();
        return;
    });
});

personneRouter.post('/delete/:id', function (req, res) {
    personneController.deleteById(req.params.id, function (state) {
        if (state === true) {
            res.json(state).status(200).end();
            return;
        }
        res.status(500).end();
        return;
    });
});


module.exports = personneRouter;
