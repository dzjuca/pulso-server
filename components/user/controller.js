const boom = require('@hapi/boom');
const store = require('./store');
const auth = require('../auth');


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

   console.log('[getUserByToken:UserController]: ', req.headers.authorization);

   const user = await store.getUser(userId);
   if(!user){
       throw boom.notFound('usuario no existente');
   }
   return user; 
}

const controller = {
    addUser,
    listUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserByToken
};

module.exports = controller;

