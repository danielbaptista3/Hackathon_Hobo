const bddController = require('./bdd');
const personneController = function(){};

personneController.getAll = function(callback) {

    bddController.executeQuery('select * from SDF', [''], function(data, state){
        callback(data, state);
    });
};

personneController.getByZone = function(latitude, longitude, callback) {
    distance = '61.5 * ACOS((sin('+latitude+')*sin(latitude)) + cos('+latitude+')*cos(latitude)*cos('+longitude+' - longitude)) * 1.60 * 1000';

    bddController.executeQuery('select * from SDF where '+distance+' <= 5', [''], function(data, state){
        callback(data, state);
    });
};

personneController.create = function(values, callback) {
    bddController.executeQuery('insert into SDF(Nom, prenom, latitude, longitude, description, genre, self) values (?)', [values], function(data, state){
        callback(state);
    });
};

personneController.deleteById = function(id, callback){
    bddController.executeQuery('delete from SDF where id = ?', [id],
        function(result, state){
            callback(state);
        });
};

module.exports = personneController;