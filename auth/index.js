const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;

function sign(data){
    console.log('[data_sign]: ',data);
    console.log('[s_sign]: ',secret);
    return jwt.sign(data, secret);
}

function verify(token){
    return jwt.verify(token, secret);
}

function getToken(auth){
    if (!auth){
        throw boom.token();
    }
    if(auth.indexOf('Bearer') === -1){
        throw boom.badData();
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);
    req.user = decoded;
    return decoded;
}

const check = {
    own: function(req, owner){
        const decoded = decodeHeader(req);
        console.log('[own]: ', decoded);

        if(decoded.id !== owner){
            throw boom.authorization();
        }

    },
    logged: function(req, owner){
        const decoded = decodeHeader(req);
    }
};

module.exports = { sign, check };