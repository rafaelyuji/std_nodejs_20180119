var express = require('express');
var app = express();
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() {

    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());


    load('routes', {cwd: 'app'}).then('infra', {cwd: 'app'}).into(app);

    app.use((req, res, next) => {
        res.status(404).render('erros/404');
        next();
    });

    // Express prioritariamente procura um middleware com 4 argumentos para executar quando acontece um erro.
    // Por esta razão, este método não precisa estar antes do tratamento para    "status 404".
    app.use((error, req, res, next) => {
        if(process.env.NODE_ENV == 'production') {
            res.status(500).render('erros/500');
        }
        next(error);
    });

    return app;
}