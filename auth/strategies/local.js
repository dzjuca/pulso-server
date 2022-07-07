const { Strategy } = require('passport-local');
const controller = require('../../components/auth');

const LocalStrategy = new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try {
      const user = await controller.login(username, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;