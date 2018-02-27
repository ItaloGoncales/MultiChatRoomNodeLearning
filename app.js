var app = require('./config/server');
var socket = require('socket.io');

var server = app.listen(3030, function () {
    console.log('Server Online');
});

var io = socket.listen(server);

app.set('io', io);

io.on('connection', function (sock) {
    console.log('Usuário se conectou via socket.');

    sock.on('disconnect', function () {
        console.log('Usuário desconectou');
    });

    sock.on('msgToServer', function (data) {
        sock.emit(
            'msgToClient',
            {
                apelido: data.apelido,
                message: data.message
            }
        );

        sock.broadcast.emit(
            'msgToClient',
            {
                apelido: data.apelido,
                message: data.message
            }
        );
    });
});