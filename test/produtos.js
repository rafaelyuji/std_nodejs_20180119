var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', () => {

    beforeEach((done) => {
        var conn = express.infra.connectionFactory();
        conn.query('delete from livros', (err, result) => {
            if(!err) {
                done();
            }
        });
    });

    it('#Listagem json', (done) => {
        request.get('/produtos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('#Listagem html', (done) => {
        request.get('/produtos')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/)
        .expect(200, done);
    });

    it('#Cadastro de produto com dados inválidos', (done) => {
        request.post('/produtos')
        .send({titulo: '', descricao: 'novo livro'})
        .expect(400, done);
    });

    it('#Cadastro de produto com dados válidos', (done) => {
        request.post('/produtos')
        .send({titulo: 'titulo', descricao: 'novo livro', preco: 21.99})
        .expect(302, done);
    });
});