const bcrypt = require('bcrypt');
const auth = require('../../auth');
const boom = require('@hapi/boom');

module.exports = function(injectedStore){
    let store = injectedStore;

    async function login(username, password){
        const data = await store.getAuth({username: username});
        return bcrypt.compare(password, data.password)
                     .then((areEqual) => {
                        if (areEqual === true){
                            return auth.sing({...data});
                        }
                     })
                     .catch((e) => {
                        throw boom.unauthorized('Error en login_controller');
                     });
    }

    async function updateAuth(userId, newAuthData){

        if(newAuthData.password){
            const hash = await bcrypt.hash(newAuth.password, 10);
            const _newAuth = {
                ...newAuth,
                password: hash
              };
        }else{
           const _newAuth = newAuthData;
        }
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
        const response = await store.deleteUser(userId);
        if(response.deletedCount === 0){
            throw boom.notFound();
        }
        return response;
    }

    return { login, insertAuth, updateAuth, deleteAuth};
};