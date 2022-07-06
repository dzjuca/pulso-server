const boom = require('@hapi/boom');
const store = require('./store');
const auth = require('../auth');


async function addUser(data){
    if(!data){
        throw boom.badData();
    }
    const newUser = {
        name: data.name,
        username: data.username,
        email: data.email
    };
    const user = await store.addUser(newUser);
    const newAuth = {
        _id: user._id,
        username: data.username,
        password: data.password
      };
    await auth.insertAuth(newAuth);
   
    if(!user){
        throw boom.notFound();
     }
    return user;
}

async function getUser(userId){
    const user = await store.getUser(userId);
    if(!user){
        throw boom.notFound();
    }
    return user; 
}

async function listUsers(){
    const users = await store.listUsers();
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
    }else{ 

        if(newUserData.username){
            const newAuthData = {
                username: newUserData.username
            };
            await auth.updateAuth(userId, newAuthData);
        }

        const response = await store.updateUser(userId, newUserData);
                     
        if(response.modifiedCount === 0){
            throw boom.badRequest();
        }
        return response;
    }
}

async function deleteUser(userId){
    const response = await store.deleteUser(userId);
                     await auth.deleteAuth(userId);
    if(response.deletedCount === 0){
        throw boom.notFound();
    }
    return response;
}

const controller = {
    addUser,
    listUsers,
    getUser,
    updateUser,
    deleteUser,
};

module.exports = controller;

