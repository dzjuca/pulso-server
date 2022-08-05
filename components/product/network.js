const express = require('express');
const passport = require('passport');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.post('/',                  passport.authenticate('jwt', {session: false}), addProduct);
router.get('/',                                                                   listProducts);
router.post('/upload',            passport.authenticate('jwt', {session: false}), uploadProductFiles);
router.get('/image/:userId/:img', getProductImages);

function addProduct( req, res ){
    controller.addProduct(req)
        .then((productDB) => {
            response.success(req, res, productDB, 201);
        })
        .catch((e) => {
            res.json(e);
        });
}
function listProducts( req, res ){
    controller.listProducts(req)
    .then((listProductsDB) => {
      response.success(req, res, listProductsDB, 201);
    })
    .catch((e) => {
      res.json(e);
    });

}
function uploadProductFiles( req, res ){
    controller.uploadProductFiles(req)
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
function getProductImages( req, res ){
    const pathImage = controller.getProductImages(req);
    res.sendFile( pathImage );
}



module.exports = router;