const store = require('./store');

function addUser(body){
    if(!body){
        return Promise.reject('Invalid data');
    }
    const user = {
        name:body.name
    };
    return store.add(user);
}

function listUsers(){
    return store.list();
}

module.exports = {
    addUser,
    listUsers,
};