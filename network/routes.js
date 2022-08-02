const user = require('../components/user/network');
const auth = require('../components/auth/network');
const post = require('../components/post/network');
const product = require('../components/product/network');


const routes = function(app){
    app.use('/pulso/users'     , user);
    app.use('/pulso/auth'      , auth);
    app.use('/pulso/posts'     , post);
    app.use('/pulso/products'  , product);
};

module.exports = routes;