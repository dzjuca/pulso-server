const LocalStrategy = require('./strategies/local');
const JwtStrategy = require('./strategies/jwt');

const routes = function(passport){
    passport.use(LocalStrategy);
    passport.use(JwtStrategy);
};

module.exports = routes;