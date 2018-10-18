const bddController = require('./bdd');
const jobController = function(){};

jobController.getAll = function(callback) {
    bddController.executeQuery('select * from job', '', function(data, state){
        callback(data, state);
    });
};

jobController.getById = function(id, callback) {
    bddController.executeQuery('select * from job where id = ?', [id], function(data, state){
        callback(data, state);
    });
};

jobController.create = function(values, callback) {
    bddController.executeQuery('insert into job (nom, adresse, ville, cp, description, salaire, actif, idAsso) values (?)', [values], function(data, state){
        callback(state);
    });
};

jobController.deleteById = function(id, callback){
    bddController.executeQuery('delete from job where id = ?', [id],
        function(result, state){
            callback(state);
        });
};

jobController.update = function(columns, values, id, callback) {
    var text ='update job set ';
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

module.exports = jobController;