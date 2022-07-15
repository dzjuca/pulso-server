const express = require('express');
const passport = require('passport');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.post('/',          passport.authenticate('jwt', {session: false}), addPost);
router.get('/',           passport.authenticate('jwt', {session: false}), listPosts);
router.get('/:postId',    passport.authenticate('jwt', {session: false}), getPost);
router.put('/:postId',    passport.authenticate('jwt', {session: false}), updatePost);
router.delete('/:postId', passport.authenticate('jwt', {session: false}), deletePost);


function addPost(req, res){
    const post = req.body;
    post.usuario  = req.user._id;
    controller.addPost(post)
        .then((postDB) => {
            response.success(req, res, postDB, 201);
        })
        .catch((e) => {
            res.json(e);
        });
}

function listPosts(req, res){
    let page = Number(req.query.page) || 1;
    let skip = page - 1;
    const limit = 5;
    skip = skip*limit;
    
    controller.listPosts(skip, limit)
              .then((listPostDB) => {
                response.success(req, res, listPostDB, 201);
              })
              .catch((e) => {
                res.json(e);
              });
}

function getPost(){

}

function updatePost(){

}

function deletePost(){

}

module.exports = router;