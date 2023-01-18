/* livereload */
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
const connectLivereload = require("connect-livereload");


const express = require('express');
const path = require('path');

const app = express();
const port = 3015;

/* Archicos estaticos */
app.use(express.static(path.resolve(__dirname, 'public')));
/* Archivos estaticos monitoreados */
liveReloadServer.watch(path.join(__dirname,'public'));

app.use(connectLivereload());

/* Rutas */
app.get('/', function (req, res) {
    res.send("Provando en EndPoint!!")
})
app.get('/index', (req, res) => res.sendFile(path.resolve(__dirname, 'views', 'index.html')));
app.get('/endpoint', (req, res) => res.sendFile(path.resolve(__dirname, 'views', 'endpoint.html')));


/* Funcion de actualizacion del servidor */
liveReloadServer.server.once("connection",() => {
    setTimeout(() => {
        liveReloadServer.refresh("/")
    }, 100);
});

/* Levantamos el servidor con app listen */
app.listen(port, function() { /* asi se veria un colback con una funcion normal */
    return console.log(`Se levanto el servidor en http://localhost:${port}`)
})