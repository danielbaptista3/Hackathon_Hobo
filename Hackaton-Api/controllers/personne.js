const bddController = require('./bdd');
const personneController = function(){};

personneController.getByZone = function(username, password, callback) {
    bddController.executeQuery('select * from association', [username, password, username, password], function(data, state){
        callback(data, state);
    });
};

personneController.create = function(values, callback) {
    bddController.executeQuery('insert into SDF (Nom, prenom, latitude, longitude, description, genre, self) values ?', values, function(data, state){
        callback(data, state);
    });
};

personneController.deleteById = function(id, callback){
    bddController.executeQuery('delete from SDF where id ?', [id],
        function(result, state){
            callback(state);
        });
};

module.exports = personneController;