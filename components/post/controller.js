const store = require('./store');
const boom = require('@hapi/boom');

const FileSystem = require('../../classes/file-system');
const fileSystem = new FileSystem();

async function addPost(req){

    const post = req.body;
    if (!post){
        throw boom.badData;
    }
    post.usuario  = req.user._id;
    const images = fileSystem.imagesFromTempToPosts( req.user._id);
    post.imgs = images;

    const postDB = await store.addPost(post);
    await postDB.populate('usuario');
    return postDB;
}
async function listPosts(req){

    let page = Number(req.query.page) || 1;
    let skip = page - 1;
    const limit = 5;
    skip = skip*limit;
    const listPostDB = await store.listPosts()
                                  .limit(limit)
                                  .sort({_id:-1})
                                  .skip(skip)
                                  .populate('usuario'); 
                                                     
    return listPostDB;
}

async function uploadFiles(req){

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

function getImage(req){

    const userId = req.params.userId;
    const img = req.params.img;
    const pathImage = fileSystem.getImageUrl ( userId, img);
    return pathImage;

}

function getPost(){

}
function updatePost(){

}
function deletePost(){
}

const controller = { addPost, listPosts, uploadFiles, getImage, getPost, updatePost, deletePost };

module.exports = controller;
