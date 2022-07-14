const bcrypt = require('bcrypt');
const auth = require('../../auth');
const boom = require('@hapi/boom');
const config = require('../../config');
const secret = config.jwtSecret;
const jwt = require('jsonwebtoken');

module.exports = function(injectedStore){
    let store = injectedStore;

    async function login(username, password){
        try {
            const data = await store.getAuth(username);
            const areEqual = await bcrypt.compare(password, data.password);
            if (areEqual === false){
               throw boom.unauthorized();
            }
            const userAuth = {
                _id:data._id,
                username: data.username,
            };
            return userAuth;
        } catch (error) {
            throw error;
        }
    }

    async function updateAuth(userId, newAuthData){
        let _newAuth = newAuthData;
        if(newAuthData.password){
            const hash = await bcrypt.hash(newAuthData.password, 10);
            _newAuth = {
                ...newAuthData,
                password: hash
              };
        }
        const response = await store.updateAuth(userId, _newAuth);
        return response;
    }

    async function insertAuth(newAuth){
        if(!newAuth){
            throw boom.badData();
        }
        const hash = await bcrypt.hash(newAuth.password, 10);
        const _newAuth = {
            ...newAuth,
            password: hash
          };
        const auth = await store.insertAuth(_newAuth);
        if(!auth){
            throw boom.notFound();
         }
        return auth;
    }

    async function deleteAuth(userId){
        const response = await store.deleteAuth(userId);
        if(response.deletedCount === 0){
            throw boom.notFound();
        }
        return response;
    }

    async function signToken(userAuth) {
        console.log('[signToken]:userAuth: ', userAuth);
        const payload = userAuth;
        const token = await jwt.sign(payload, secret);
        userAuth.token = token;
        return userAuth;
    }

    return { login, insertAuth, updateAuth, deleteAuth, signToken};
};