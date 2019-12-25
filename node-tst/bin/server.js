const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodetst:server');

const port = 8001
app.set('port', port);

const server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListner);

function onError(err)
{
    if(err.syscall !== 'listen')
        throw err;

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (err.code)
    {
        case 'EACCES':
            console.error(bind + ' Requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default: throw err;
    }
}

function onListner()
{
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

    debug('Listening on ' + bind);
}


server.listen(port);
console.log("Running on " + port);