const boom = require('@hapi/boom');
const store = require('./store');

async function addUser(newUser){
    if(!newUser){
        throw boom.badData();
    }
    const user = await store.addUser(newUser);
    if(!user){
        throw boom.notFound('not found');
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
        throw boom.notFound('not found');
    }
    return users;
}

async function updateUser(userId, newUserData){
    const response = await store.updateUser(userId, newUserData);
    if(response.modifiedCount === 0){
        throw boom.badRequest('bad request');
    }
    return response;
}

async function deleteUser(userId){
    const response = await store.deleteUser(userId);
    if(response.deletedCount === 0){
        throw boom.notFound('not found');
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

