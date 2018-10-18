const RouterManager = function() { };

RouterManager.attach = function(app){
    app.use('/association', require('./association'));
    app.use('/sdf' , require('./personne'));
    app.use('/job', require('./job'));
    app.use('/logement', require('./logement'));
    app.use('/admin', require('./admin'));
    app.use('/visite', require('./visite'));

};

module.exports = RouterManager;