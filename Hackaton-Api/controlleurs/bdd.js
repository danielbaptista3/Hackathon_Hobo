var mysql = require('mysql');

const Pool = require('pg-pool');
const config= require('../config');
const connection = config.database;
const bddController = function(){ };

var pool = new Pool(connection);

var query = {
    text: "",
    values: undefined,
}

bddController.start = function(callback){
    pool.connect(function(err, client, done){
        if(err)
        {
            console.log("Erreur lors de la connection: " +err);
            callback(false);
            return;
        }
        done
        console.log('Connecté à la base de données');
        callback(true, done);
        return;
    });
};


bddController.executeQuery = function(text, values, callback){
    var state = false;

    bddController.start(function(state, done) {
        if(state === false) {callback(undefined, state); return;}
        bddController.makeQuery(text, values);
        pool.query(query, function(err, res){
            if(err){
                state = false;
                console.log('Erreur lors de l\'execution de la requête: '+err);
                callback(undefined, state);
                return;
            }

            console.log('Requête executée');
            data = JSON.stringify(res.rows);
            state = true;
            done();
            callback(data, state);
        });
    });
};


bddController.stop = function(){
    pool.end(function(){
        console.log('Déconnecté de la base de données');
    });
};


module.exports = bddController;

bddController.makeQuery = function(text, values){
    query.text = text;
    if(values != '')
    {
        query.values = values;
    }
    else {
        query.values = undefined;
    }
};