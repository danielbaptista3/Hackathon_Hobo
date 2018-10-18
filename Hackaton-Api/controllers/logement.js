const bddController = require('./bdd');
const logementController = function(){};

logementController.getAll = function(callback) {
    bddController.executeQuery('select * from logement', '', function(data, state){
        callback(data, state);
    });
};

logementController.getById = function(id, callback) {
    bddController.executeQuery('select * from logement', [id], function(data, state){
        callback(data, state);
    });
};

logementController.create = function(values, callback) {
    bddController.executeQuery('insert into logement (adresse, prix, ville, CP, surface, libre, idAsso) values (?)', [values], function(data, state){
        callback(state);
    });
};

logementController.deleteById = function(id, callback){
    bddController.executeQuery('delete from logement where id = ?', [id],
        function(result, state){
            callback(state);
        });
};

logementController.update = function(columns, values, id, callback) {
    var text ='update logement set ';
    var i = 1;

    for(var column of columns)
    {
        text += column + ' = ?, ';
        i++;
    }
    text = text.slice(0,-2) + ' where id = ' + id;

    bddController.executeQuery(text, values, function(result, state){
        callback(state);
    });
};

module.exports = logementController;