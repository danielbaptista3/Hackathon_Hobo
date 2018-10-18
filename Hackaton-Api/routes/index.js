const RouterManager = function() { };

RouterManager.attach = function(app){
    app.use('/association', require('./association'));

};

module.exports = RouterManager;