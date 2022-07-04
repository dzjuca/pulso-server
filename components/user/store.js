const User = require('./model');

function addUser(user){
    const newUser = new User(user);
    return newUser;
}

function listUsers(){
    return User.find();
}

module.exports = {
    add:addUser,
    list:listUsers,
};

