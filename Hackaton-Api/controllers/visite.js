const bddController = require('./bdd');
const visiteController = function(){};

visiteController.getLast = function(idSDF, idAsso, callback) {
    bddController.executeQuery('select  * from visite where idSDF = ? and idAsso = ? order by id limit 10', [idSDF, idAsso], function(data, state){
        callback(data, state);
    });
};

visiteController.create = function(values, callback) {
    bddController.executeQuery('insert into visite (date_heure, description, idAsso, idSDF) values (?)', [values], function(data, state){
        callback(data, state);
    });
};

module.exports = visiteController;