const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', (req, res, next) => {
    const body = req.body;
    controller.addUser(body)
        .then((data) => {
            response(req, res, data, 201);
        })
        .catch((e) => {
            next(e);
        });
});

router.get('/', (req, res, next) => {
    controller.listUsers()
        .then((users) => {
            response.success(req, res, users, 200);
        })
        .catch((e) =>{
            next(e);
        });
});


module.exports = router;


