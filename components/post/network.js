const express = require('express');
const passport = require('passport');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.post('/',                  passport.authenticate('jwt', {session: false}), addPost);
router.post('/upload',            passport.authenticate('jwt', {session: false}), uploadFiles);
router.get('/',                   listPosts);
router.get('/image/:userId/:img', getImage);


router.get('/:postId',    passport.authenticate('jwt', {session: false}), getPost);
router.put('/:postId',    passport.authenticate('jwt', {session: false}), updatePost);
router.delete('/:postId', passport.authenticate('jwt', {session: false}), deletePost);



function addPost(req, res){
    controller.addPost(req)
        .then((postDB) => {
            response.success(req, res, postDB, 201);
        })
        .catch((e) => {
            res.json(e);
        });
}
function listPosts(req, res){
    controller.listPosts(req)
              .then((listPostDB) => {
                response.success(req, res, listPostDB, 201);
              })
              .catch((e) => {
                res.json(e);
              });
}
async function uploadFiles(req, res){
    console.log("🚀 ~ file: network.js ~ line 39 ~ uploadFiles ~ req", req.files);
    controller.uploadFiles(req)
              .then((file) =>{
                    res.json({
                        ok: true,
                        file: file.mimetype
                    });
              })
              .catch((e) => {
                res.json({
                    error: e.message
                });
              });

}
function getImage(req, res){
    const pathImage = controller.getImage(req);
    res.sendFile( pathImage );
}

/* ----------------------------------------------------- */

function getPost(){

}
function updatePost(){

}
function deletePost(){

}

module.exports = router;

