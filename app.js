// Dependences
const proyect = require('./config.js');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const colors = require('colors');
const crypto = require('crypto');

// Initializations
const app = express();

// Settings
app.use('/service', morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/view', express.static('./src/view'));
app.use('/control', express.static('./src/control'));
app.use('/panel', require('./src/model/route/panel.js'));
app.use('/service/cliente', require('./src/model/route/service.cliente.js'));
app.use('/service/usuario', require('./src/model/route/service.usuario.js'));

app.set('views', [
    path.join(__dirname, '/src/view/panel.page'),
    path.join(__dirname, '/src/view/public.page')
]);
app.set('view engine', 'pug');

// Global variables
app.locals.proyect = proyect;
crypto.randomBytes(48, (ex, buf) => {
    app.locals.secretkey = buf.toString('hex');
});

app.listen(proyect.port, () => {
    console.log("App: \"".green + proyect.name.toUpperCase().red + ("\" on port \"".green) + proyect.port.toString().red + ("\"..".green));
});