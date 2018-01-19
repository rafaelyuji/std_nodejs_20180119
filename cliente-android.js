var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 8080,
    path: '/produtos',
    headers: {
        'Accept': 'application/json'
    }
};

http.get(configuracoes, (res) => {
    console.log(res.statusCode);
    res.on('data', (body) => {
        console.log('Corpo: ' + body);
    });
});