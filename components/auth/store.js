const boom = require('@hapi/boom');
const Auth = require('./model');

async function getAuth(username){
    try {
        const user = await Auth.findOne({ username: username });
        return user; 
    } catch (error) {
        throw boom.internal();
    }
 
}

async function insertAuth(auth){
    try {
        const newAuth = new Auth(auth);
        const response = await newAuth.save();
        return response;
    } catch (error) {
        //throw boom.internal();
        throw error;
    }

}

async function updateAuth(userId, newAuthdata){
    try {
        const response = await User.updateOne( { _id: userId}, { $set: newAuthdata } );
        return response;
    } catch (error) {
        throw boom.internal();
    }

}

async function deleteAuth(userId){
    try {
        const response = await Auth.deleteOne({ _id: userId });
        return response;
    } catch (error) {
        throw boom.internal();
    }
}

module.exports = { getAuth, insertAuth, updateAuth, deleteAuth };