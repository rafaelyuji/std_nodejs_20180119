module.exports = function(app) {
    var listaProdutos = function(req, res){

        console.log('Listando produtos...');
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(err, results, next) {
            if(err) {
                return next(err);
            }

            res.format({
                html: () => {
                    res.render('produtos/lista', {lista: results});
                },
                json: () => {
                    res.json(results);
                }
            });
        });

        connection.end();
    };

    app.get('/produtos', (req, res) => {
        listaProdutos(req, res);
    });

    app.get('/produtos/form', function(req, res) {
        console.log('Cadastro de produtos...');
        res.render('produtos/form', {
            errosValidacao: {},
            produto: {}
        });
    });

    app.post('/produtos', function(req, res){
        console.log('Salvando produto...');

        var produto = req.body;
        console.log(produto);

        req.assert('titulo', 'Título é obrigatório').notEmpty();
        req.assert('preco', 'Preço inválido').isFloat();

        var erros = req.validationErrors();

        if(erros) {
            res.format({
                html: () => {
                    res.status(400).render('produtos/form', {
                        errosValidacao: erros,
                        produto: produto
                    });
                },
                json: () => {
                    res.status(400).json(erros);
                }
            });

            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.salva(produto, (err, results) => {
            console.log(err);
            res.redirect('/produtos');
        });

        connection.end();
    });
}