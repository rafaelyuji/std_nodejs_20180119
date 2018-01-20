var mysql = require('mysql');

function createDBConnection() {
    if(!process.env.NODE_ENV) {
        return mysql.createConnection({
            host:'localhost',
            user: 'root',
            password: '',
            database: 'casadocodigo'
        });
    } else if(process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host:'localhost',
            user: 'root',
            password: '',
            database: 'casadocodigo_test'
        });
    } else if(process.env.NODE_ENV == 'production') {
        var urlConexao = process.env.CLEARDB_DATABASE_URL;
        var dadosUrlBase = urlConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/);
        return mysql.createConnection({
            host: dadosUrlBase[3],
            user: dadosUrlBase[1],
            password: dadosUrlBase[2],
            database: dadosUrlBase[4]
        });
    }
}

module.exports = function() {
    return createDBConnection;
}

// Install Heroku
// wget https://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli-linux-x64.tar.gz -O heroku.tar.gz
// $ tar -xvzf heroku.tar.gz
// $ mkdir -p /usr/local/lib /usr/local/bin
// $ sudo mv heroku-cli-v6.x.x-darwin-64 /usr/local/lib/heroku
// $ sudo ln -s /usr/local/lib/heroku/bin/heroku /usr/local/bin/heroku
// https://www.howtoforge.com/tutorial/install-git-and-github-on-ubuntu-14.04/