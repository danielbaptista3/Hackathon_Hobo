const express = require('express');
const personneRouter = express.Router();
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const personneController = controllers.personne;

personneRouter.use(bodyParser.json());

personneRouter.get('/all', function (req, res) {
    personneController.getAll(function (data, state) {
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

personneRouter.get('/zone/:latitude/:longitude', function (req, res) {
    personneController.getByZone(req.params.latitude, req.params.longitude, function (data, state) {
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

personneRouter.post('/create', function (req, res) {
    var values = [req.body.lastName, req.body.firstName, req.body.latitude, req.body.longitude, req.body.description, req.body.genre, req.body.self];

    personneController.create(values, function(state) {
        if (state === true) {
            console.log(state);
            res.json(state).status(200);
            return;
        }
        console.log(state);

        res.status(400).end();
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
