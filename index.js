const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const routerApi = require('./network/routes');
const apiError = require('./middlewares/error');

var app = express();

/* DataBase connection */
mongoose.connect(config.dbUrl)
        .then(() => console.log('Connected to MongoDB-Atlas PulsoDatabase'))
        .catch((e) => console.error(e));

app.use(express.json());
routerApi(app);

app.use('/', express.static('public'));

//app.use(apiError.logErrors);
app.use(apiError.clientErrorHandler);
app.use(apiError.errorHandler);

app.listen(3000, () => {
    console.log('La aplicación está ecuchando en el puerto: '+ config.port);
});

