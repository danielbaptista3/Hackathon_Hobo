const express = require('express');
const personneRouter = express.Router();
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const personneController = controllers.personne;

personneRouter.use(bodyParser.json());

personneRouter.get('/zone/:zone', function (req, res) {
    personneController.findZone(req.params.zone, function (data, state) {
        if (state === false) {
            res.status(500).end();
        }
        if (data !== 0) {
            res.status(200);
        } else {
            res.status(404);
        }
    });
});

personneRouter.get('/:id', function (req, res) {
    personneController.findOne(req.params.id, function (data, state) {
        if (state === false) {
            res.status(500).end();
        }
        if (data !== 0) {
            res.status(200);
        } else {
            res.status(404);
        }
    });
});

personneRouter.get('/', function (req, res) {
    personneController.findAll(function (data, state) {
        if (state === false) {
            res.status(500).end();
        }
        if (data !== 0) {
            res.status(200);
        } else {
            res.status(404);
        }
    });
});

personneRouter.post('/', function (req, res) {
    personneController.create([req.body.lastName, req.body.firstName, req.body.latitude, req.body.longitude, req.body.description, req.body.genre, req.body.self], function (state) {
        if (state === false) {
            res.status(500).end();
        }
        if (data !== 0) {
            res.status(200);
        } else {
            res.status(404);
        }
    });
});

personneRouter.post('/delete/:id', function (req, res) {
    personneController.delete(req.params.id, function (data, state) {
        if (state === true) {
            res.json(state).status(200).end();
            return;
        }
        res.status(500).end();
        return;
    });
});


module.exports = personneRouter;
