const express = require('express');
const port = process.env.PORT || 3000;
const routerApi = require('./network/routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error');

var app = express();
app.use(express.json());
routerApi(app);

app.use('/', express.static('public'));
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(3000, () => {
    console.log('La aplicación está ecuchando en el puerto: '+ port);
});

