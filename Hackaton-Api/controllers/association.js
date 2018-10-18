const bddController = require('./bdd');
const associationController = function(){};

associationController.connect = function(username, password, callback) {
    bddController.executeQuery('select * from association, admin where (association.mail = ? and association.password = ?) OR (admin.user = ? and admin.password = ?)', [username, password, username, password], function(data, state){
        callback(data, state);
    });
};

associationController.create = function(values, callback) {
    bddController.executeQuery('insert into association (Nom, mail, password, RNA, SIREN) values (?)', [values], function(data, state){
        callback(state);
    });
};

associationController.deleteById = function(id, callback){
    bddController.executeQuery('delete from association where id = ?', [id],
        function(result, state){
            callback(state);
        });
};

associationController.update = function(columns, values, id, callback) {
    var text ='update association set ';
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

module.exports = associationController;