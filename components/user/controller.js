const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const store = require('./store');


async function addUser(newUser){
    if(!newUser){
        throw boom.badData();
    }
    const hash = await bcrypt.hash(newUser.password, 10);
    const _newUser = {
        ...newUser,
        password: hash
      };
    const user = await store.addUser(_newUser);
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
    const response = await store.updateUser(userId, newUserData);
    if(response.modifiedCount === 0){
        throw boom.badRequest();
    }
    return response;
}

async function deleteUser(userId){
    const response = await store.deleteUser(userId);
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

