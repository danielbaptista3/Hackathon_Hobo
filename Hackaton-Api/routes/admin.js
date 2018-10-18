const express = require('express');
const adminRouter = express.Router();
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const adminController = controllers.admin;

adminRouter.use(bodyParser.json());

adminRouter.get('/:username/:password', function (req, res) {
    adminController.connect(req.params.username, req.params.password, function (state) {
        if (state === true) {
            res.json(state).status(200).end();
            return;
        }
        res.status(500).end();
        return;
    });
});

adminRouter.post('/', function (req, res) {
    adminController.create([req.body.username, req.body.password], function (state) {
        if (state === true) {
            res.json(state).status(200).end();
            return;
        }
        res.status(500).end();
        return;
    });
});

adminRouter.post('/update/:id', function (req, res) {
    if (Number.parseInt(req.params.id)) {
        var values = []
        var columns = []

        for (var key in req.body) {
            values.push(req.body[key]);
            columns.push(key);
        }
        adminController.update(columns, values, req.params.id, function (state) {
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

module.exports = adminRouter;
