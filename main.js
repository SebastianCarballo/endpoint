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
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'views', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.resolve(__dirname, 'views', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.resolve(__dirname, 'views', 'register.html')));

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