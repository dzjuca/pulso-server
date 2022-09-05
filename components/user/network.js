const boom = require('@hapi/boom');
const express = require('express');
const secure = require('./secure');
const passport = require('passport');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', addUser);
router.get('/',             passport.authenticate('jwt', {session: false}), listUsers);
router.get('/:userId',      passport.authenticate('jwt', {session: false}), getUser);
router.get('/user/bytoken', passport.authenticate('jwt', {session: false}), getUserByToken);
router.get('/image/:userId/:img', getImage);
router.put('/:userId',      passport.authenticate('jwt', {session: false}), updateUser);
router.put('/avatar/:userId',      passport.authenticate('jwt', {session: false}), updateAvatar);
router.delete('/:userId',   passport.authenticate('jwt', {session: false}), deleteUser);

function addUser(req, res, next){
    const newUser = req.body;
    controller.addUser(newUser)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch((e) => {
            next(e);
            //res.status(500).send({message:e.message});
        });
}
function listUsers (req, res, next){
    
    controller.listUsers(req)
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch((e) => {
            next(e);
        });
}
function getUser(req, res, next){
    const { userId } = req.params;
    controller.getUser(userId)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((e) => {
            next(e);
        });
}
function updateUser(req, res, next){
    const newUserData = req.body;
    const userId = req.params.userId;
    controller.updateUser(userId, newUserData)
        .then((data) => {
            if(data.modifiedCount === 0){
                response.success(req, res, 'No se realizaron modificaciones', 201);
            }else{
                response.success(req, res, 'Modificado correctamente', 201);
            }
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
function getUserByToken(req, res, next){
    controller.getUserByToken(req)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((e) => {
            next(e);
        });
}
function updateAvatar(req, res, next){
   
    controller.updateAvatar(req)
        .then((data) => {
            if(data.responseDB.modifiedCount === 0){
                //response.success(req, res, 'No se realizaron modificaciones', 201);
                res.json({
                    ok: true,
                    message: 'No se realizaron modificaciones',
                    avatar: data.image
                });
            }else{
                //response.success(req, res, 'Modificado correctamente', 201);
                res.json({
                    ok: true,
                    message:'Modificado correctamente',
                    avatar: data.image
                });
            }
        })
        .catch((e) => {
            next(e);
        });
}
function getImage(req, res){
    const pathImage = controller.getImage(req);
    res.sendFile( pathImage );
}
module.exports = router;


