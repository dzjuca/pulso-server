const boom = require('@hapi/boom');
const store = require('./store');
const auth = require('../auth');

const FileSystem = require('../../classes/file-system');
const fileSystem = new FileSystem();


async function addUser(data){

    try {

        if(!data){
            throw boom.badData();
        }
        const newUser = {
            username: data.username,
            email: data.email
        };
        const user = await store.addUser(newUser);
        if(!user){
            throw boom.notFound();
         }
        const newAuth = {
            _id: user._id,
            username: data.username,
            password: data.password
          };
        await auth.insertAuth(newAuth);
        return user;
        
    } catch (error) {

        if(error.message.indexOf("11000") != -1){
            if(error.message.indexOf('username') != -1){

                throw boom.badData('usuario no disponible');
            }

            if(error.message.indexOf('email') != -1){

                throw boom.badData('Este correo ya está registrado');

            }
        }else{

            throw boom.internal('Error en el servidor');

        }
         
    }

}

async function getUser(userId){
    const user = await store.getUser(userId);
    if(!user){
        throw boom.notFound();
    }
    return user; 
}

async function listUsers(req){
    const users = await store.listUsers(req);
    if(!users){
        throw boom.notFound();
    }
    return users;
}

async function updateUser(userId, newUserData){
    if(newUserData.password){
        const newAuthData = {
            password: newUserData.password
        };
        await auth.updateAuth(userId, newAuthData);
    }
    if(newUserData.username){
        const newAuthData = {
            username: newUserData.username
        };
        await auth.updateAuth(userId, newAuthData);
    }

    const response = await store.updateUser(userId, newUserData);
                     
    return response;
}

async function deleteUser(userId){
    const response = await store.deleteUser(userId);
                     await auth.deleteAuth(userId);
    if(response.deletedCount === 0){
        throw boom.notFound();
    }
    return response;
}

async function getUserByToken(req){

   const userId =  req.user._id;

   const user = await store.getUser(userId);
   if(!user){
       throw boom.notFound('usuario no existente');
   }
   return user; 
}

async function updateAvatar(req){

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
    const images = fileSystem.imagesFromTempToAvatar( req.user._id);
    const user = req.user;
    user.avatar = images[0];
    const responseDB = await store.updateUser(req.user._id, user);
    const response = {
        responseDB: responseDB,
        image: images[0]
    };

    return response;

}

function getImage(req){

    const userId = req.params.userId;
    const img = req.params.img;
    const pathImage = fileSystem.getAvatarImageUrl ( userId, img);
    return pathImage;

}

const controller = {
    addUser,
    listUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserByToken,
    updateAvatar,
    getImage
};



module.exports = controller;

