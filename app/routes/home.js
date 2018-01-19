module.exports = function(app) {
    var listaProdutos = function(req, res){

        console.log('Listando produtos...');
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(err, results, next) {
            if(err) {
                return next(err);
            }

           res.render('home/index', {livros: results});
        });

        connection.end();
    };

    app.get('/', (req, res) => {
        listaProdutos(req, res);
    })
}