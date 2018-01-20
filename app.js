var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

// var mongoose = require('mongoose');

// mongoose.connect('mongodb://vip:vip@ds249727.mlab.com:49727/vip', {useMongoClient: true});
// mongoose.Promise = global.Promise;

// var Cat = mongoose.model('Cat', { name: String });

// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// });

var port = process.env.PORT || 8080;

http.listen(port, function() {
    console.log('Servidor rodando');
});
