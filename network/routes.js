const express = require('express');
const user = require('../components/user/network');


const routes = function(app){
    app.use('/user', user);
};

module.exports = routes;