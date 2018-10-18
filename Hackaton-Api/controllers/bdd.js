var mysql = require('mysql');

const config= require('../config');
var connection = config.database;
const bddController = function(){ };

var pool = mysql.createPool(connection);

bddController.start = function(callback){
    pool.getConnection(function(err){
        if(err)
        {
            console.log("Erreur lors de la connection: " +err);
            callback(false);
            return;
        }
        console.log('Connecté à la base de données');
        callback(true);
        return;
    });
};


bddController.executeQuery = function(text, values, callback){
    var state = false;

    bddController.start(function(state) {
        if(state === false) {callback(undefined, state); return;}
        pool.query(text, values, function(err, res){
            if(err){
                state = false;
                console.log('Erreur lors de l\'execution de la requête: '+err);
                callback(undefined, state);
                return;
            }

            console.log('Requête executée');
            data = JSON.stringify(res);
            state = true;
            callback(data, state);
        });
    });
};



module.exports = bddController;