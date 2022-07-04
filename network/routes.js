const user = require('../components/user/network');


const routes = function(app){
    app.use('/users', user);
};

module.exports = routes;