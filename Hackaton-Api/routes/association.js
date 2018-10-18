const express = require('express');
const associationRouter = express.Router();
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const associationController = controllers.association;

associationRouter.use(bodyParser.json());

associationRouter.get('/:username/:password', function (req, res) {
    associationController.connect(req.params.username, req.params.password, function (data, state) {
        data = JSON.parse(data);
        if (state === false) {
            res.status(500).end();
            return;
        }
        if (data !== 0) {
            res.json(data).status(200).end();
            return;
        }
        res.status(404).end();
        return;
    });
});

associationRouter.post('/create', function (req, res) {
    associationController.create([req.body.name, req.body.mail, req.body.password, req.body.rna, req.body.siren], function (state) {

        if (state === true) {
            res.json(state).status(200).end();
            return;
        }
        res.status(500).end();
        return;
    });
});

associationRouter.put('/update/:id', function (req, res) {
    if (Number.parseInt(req.params.id)) {
        var values = []
        var columns = []

        for (var key in req.body) {
            values.push(req.body[key]);
            columns.push(key);
        }
        associationController.update(columns, values, req.params.id, function (state) {
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

associationRouter.delete('/delete/:id', function (req, res) {
    associationController.deleteById(req.params.id, function (state) {
        if (state === true) {
            res.json(state).status(200).end();
            return;
        }
        res.status(500).end();
        return;
    });
});


module.exports = associationRouter;
