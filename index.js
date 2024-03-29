const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');
const routerApi = require('./network/routes');
const routerPassport = require('./auth/routes');
const apiError = require('./middlewares/error');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


var app = express();

/* DataBase connection ,{useNewUrlParser:true} */ 
mongoose.connect(config.dbUrl)
        .then(() => console.log('Connected to MongoDB-Atlas PulsoDatabase'))
        .catch((e) => console.error(e));

/* Funciones no utilizadas --------
app.use(express.json());
*/

/* Middleware Functions */
/* ----- bodyParser ----- */
app.use( bodyParser.urlencoded({extended:true}));
app.use( bodyParser.json());

/* ----- cors ----- */
//app.use(cors({origin:true, credentials:true}));

/*
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Authorization");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method == 'OPTIONS') {
        res.status(200).send();
    } else {
        next();
    }
});
*/

app.use(cors({
    credentials:true,
    Access_Control_Allow_Origin: "*",
    origin:"*",
    methode:['GET','POST','PATCH','DELETE','PUT'],
    allowedHeaders:'Content-Type, Authorization, Origin, X-Requested-With, Accept'
  })); 


/* ----- fileUpload ----- */
app.use(fileUpload({useTempFiles: true}));

app.use('/pulso', express.static('public'));
routerPassport(passport);
routerApi(app);

/* Handler Error Middleware */
app.use(apiError.logErrors);
app.use(apiError.clientErrorHandler);
app.use(apiError.errorHandler);

app.listen(config.port, () => {
    console.log('La aplicación está ecuchando en el puerto: '+ config.port);
});

