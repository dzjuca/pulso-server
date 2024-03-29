const boom = require('@hapi/boom');
const User = require('./model');

async function addUser(user){
        const newUser = new User(user);
        const response = await newUser.save();
        return response;
}

async function getUser(userId){
    try {
        const user = await User.findOne({_id:userId});
        return user; 
    } catch (error) {
        throw boom.internal();
    }
 
}

async function listUsers(req){
    
    try {
        let users = [];
        if(req.query.query){
            let query = {username:{$regex: ''}};
            query.username.$regex = req.query.query;
            users = await User.find(query);
        }else{
            users = await User.find();
        }

        return users;
    } catch (error) {
        throw boom.internal();
    }
}

async function updateUser(userId, newUserData){
    try {
        const response = await User.updateOne({ _id: userId},{ $set: newUserData });
        return response;
    } catch (error) {
        throw boom.internal();
    }
}

async function deleteUser(userId){
    try {
        const response = await User.deleteOne({ _id: userId });
        return response;
    } catch (error) {
        throw boom.internal();
    }
}

module.exports = {
    addUser,
    listUsers,
    getUser,
    updateUser,
    deleteUser,
};

