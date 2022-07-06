const user = require('../components/user/network');
const auth = require('../components/auth/network');


const routes = function(app){
    app.use('/users', user);
    app.use('/auth', auth);
};

module.exports = routes;