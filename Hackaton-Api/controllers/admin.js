const bddController = require('./bdd');
const adminController = function(){};

adminController.create = function(values, callback) {
    bddController.executeQuery('insert into admin (user,password, idAsso) values ?', values, function(data, state){
        callback(data, state);
    });
};


adminController.update = function(columns, values, id, callback) {
    var text ='update admin set ';
    var i = 1;

    for(var column of columns)
    {
        text += column + ' = $' + i +', ';
        i++;
    }
    text = text.slice(0,-2) + ' where id = ' + id;

    bddController.executeQuery(text, values, function(result, state){
        callback(state);
    });
};

module.exports = adminController;