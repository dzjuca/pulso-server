const user = require('../components/user/network');
const auth = require('../components/auth/network');


const routes = function(app){
    app.use('/pulso/users', user);
    app.use('/pulso/auth', auth);
};

module.exports = routes;