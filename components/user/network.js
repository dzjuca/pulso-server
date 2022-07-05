const boom = require('@hapi/boom');
const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', addUser);
router.get('/', listUsers);
router.get('/:userId', getUser);
router.put('/:userId', updateUser);
router.delete('/:userId',deleteUser);

function addUser(req, res, next){
    const newUser = req.body;
    controller.addUser(newUser)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch((e) => {
            next(e);
        });
}
function listUsers (req, res, next){
    controller.listUsers()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch((e) => {
            next(e);
        });
}

async function getUser(req, res, next){
    try {
        const { userId } = req.params;
        const user = await controller.getUser(userId);
        return response.success(req, res, user, 200);
    } catch (error) {
        next(error);
    }
}

function updateUser(req, res, next){
    const newUserData = req.body;
    const userId = req.params.userId;
    controller.updateUser(userId, newUserData)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch((e) => {
            next(e);
        });
}

function deleteUser(req, res, next){
    const userId = req.params.userId;
    controller.deleteUser(userId)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch((e) => {
            next(e);
        });
}

module.exports = router;


