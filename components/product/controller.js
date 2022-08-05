const store = require('./store');
const boom = require('@hapi/boom');

const FileSystem = require('../../classes/file-system');
const fileSystem = new FileSystem();

async function addProduct( req ){

    const product = req.body;
    if (!product){
        throw boom.badData;
    }
    product.usuario  = req.user._id;
    const images = fileSystem.imagesFromTempToProducts( req.user._id);
    product.imgs = images;

    const productDB = await store.addProduct(product);
    await productDB.populate('usuario');
    return productDB;
}
async function listProducts( req ){
    let page = Number(req.query.page) || 1;
    let skip = page - 1;
    const limit = 5;
    skip = skip*limit;
    const listProductsDB = await store.listProducts()
                                  .limit(limit)
                                  .sort({_id:-1})
                                  .skip(skip)
                                  .populate('usuario'); 
    const resp = {
        page: page,
        products: listProductsDB
    };                                                    
    return resp;
}
async function uploadProductFiles( req ){

    if(!req.files){

        throw boom.badData('No se subió ningún archivo');
    }

    const file = req.files.image;

    if(!file){

        throw boom.badData('No se subió ningún archivo de imagen');
    }

    if(!file.mimetype.includes('image')){

        throw boom.badData('Lo que subió no es una imagen');
    }

    await fileSystem.saveTemporalImage(file, req.user._id);

    return file;
}
function getProductImages( req ){
    const userId = req.params.userId;
    console.log("🚀 ~ file: controller.js ~ line 62 ~ getProductImages ~ userId", userId);
    const img = req.params.img;
    console.log("🚀 ~ file: controller.js ~ line 64 ~ getProductImages ~ img", img);
    const pathImage = fileSystem.getProductImageUrl( userId, img);
    return pathImage;
}

const controller = { addProduct, listProducts, uploadProductFiles, getProductImages };

module.exports = controller;