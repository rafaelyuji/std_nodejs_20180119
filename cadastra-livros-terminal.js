var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 8080,
    path: '/produtos',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var client = http.request(configuracoes, (res) => {
    console.log(res.statusCode);
    res.on('data', (body) => {
        console.log('Corpo: ' + body);
    });
});

var produto = {
    titulo: 'Mais sobre NodeJS',
    descricao: 'Node, Javascript e um pouco sobre HTTP',
    preco: '90.50'
};

client.end(JSON.stringify(produto));