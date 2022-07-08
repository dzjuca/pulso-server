const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');
const routerApi = require('./network/routes');
const routerPassport = require('./auth/routes');
const apiError = require('./middlewares/error');


var app = express();

/* DataBase connection ,{useNewUrlParser:true} */ 
mongoose.connect(config.dbUrl)
        .then(() => console.log('Connected to MongoDB-Atlas PulsoDatabase'))
        .catch((e) => console.error(e));

/* Middleware Functions */
app.use(express.json());
app.use('/', express.static('public'));
routerPassport(passport);
routerApi(app);

/* Handler Error Middleware */
app.use(apiError.logErrors);
app.use(apiError.clientErrorHandler);
app.use(apiError.errorHandler);

app.listen(3000, () => {
    console.log('La aplicación está ecuchando en el puerto: '+ config.port);
});

