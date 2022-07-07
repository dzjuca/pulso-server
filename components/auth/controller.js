const bcrypt = require('bcrypt');
const auth = require('../../auth');
const boom = require('@hapi/boom');

module.exports = function(injectedStore){
    let store = injectedStore;

    async function login(username, password){
        try {
            const data = await store.getAuth(username);
            console.log('[data]: ', data);
            console.log('[{...data}]: ', {...data});

            const areEqual = await bcrypt.compare(password, data.password);
            if (areEqual === false){
               throw boom.unauthorized();
            }
            return auth.sing({...data});
        } catch (error) {
            throw error;
        }
    }

    async function updateAuth(userId, newAuthData){

        console.log('[newAuthData]: ', newAuthData);
        let _newAuth = newAuthData;
        if(newAuthData.password){
            const hash = await bcrypt.hash(newAuthData.password, 10);
            _newAuth = {
                ...newAuthData,
                password: hash
              };
        }
        console.log('[_newAuth]: ', _newAuth);
        const response = await store.updateAuth(userId, _newAuth);
        if(response.modifiedCount === 0){
            throw boom.badRequest();
        }
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

    return { login, insertAuth, updateAuth, deleteAuth};
};