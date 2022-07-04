const store = require('./store');

function addUser(body){
    if(!body){
        return Promise.reject('Invalid data');
    }
    const user = {
        name:body.name
    };
    return store.addUser(user);
}

function listUsers(){
    return store.listUsers();
}

module.exports = {
    addUser,
    listUsers,
};