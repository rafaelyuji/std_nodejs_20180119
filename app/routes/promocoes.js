module.exports = function(app) {
    var listaProdutos = function(req, res){

        console.log('Listando produtos...');
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(err, results, next) {
            if(err) {
                return next(err);
            }

           res.render('promocoes/form', {lista: results});
        });

        connection.end();
    };

    app.get('/promocoes/form', function(req, res) {
        console.log('Cadastro de promoções...');
        listaProdutos(req, res);
    });

    app.post('/promocoes', function(req, res) {
        var promocao = req.body;
        app.get('io').emit('novaPromocao', promocao);
        res.redirect('promocoes/form');
    });
}