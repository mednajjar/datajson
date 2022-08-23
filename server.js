const http = require('http');
const app = require('./app')
const port = process.env.PORT || 4500;

app.set('port', port)

const server = http.createServer(app)

server.listen(port, () => {
    return console.log(`server listen to : http://localhost:${port}`);
})

