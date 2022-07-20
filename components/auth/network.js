const express = require('express');
const passport = require('passport');
const response = require('../../network/response');
const Controller = require('./index');

const router = express.Router();

router.post('/login', passport.authenticate('local', {session: false}), (req, res, next) => {
        Controller.signToken(req.user)
                  .then((userAuth) => {
                    response.success(req, res, userAuth, 200);
                  })
                  .catch((e) => {
                    next(e);
                  });              
});

module.exports = router;