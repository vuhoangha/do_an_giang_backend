const crypto = require('crypto');
const fs = require('fs');
const KEY = fs.readFileSync('../config/key.txt', 'utf8');
const CERT_PRIVATE = fs.readFileSync('../config/private.key', 'utf8');
const CERT_PUBLIC = fs.readFileSync('../config/public.crt', 'utf8');
const ALGORITHM = { algorithm: 'RS256' };
const jwt = require('jsonwebtoken');

const parseJson = str => {
    try {
        return JSON.parse(str);
    } catch (error) {
        return console.error(`JSON invalid with ${str}`);
    }
}

const stringifyJson = obj => {
    try {
        return JSON.stringify(obj);
    } catch (error) {
        return console.error(`Object parse JSON invalid with ${obj}`);
    }
}

const createPassword = text => {
    if (text == null || text === '') return false;
    return crypto.createHmac('sha256', KEY).update(text).digest('hex');
};

const signToken = (username, cb) => {
    if (!username || !cb) return console.error(`signToken fail with username: ${username}`);
    jwt.sign({ id: username }, CERT_PRIVATE, ALGORITHM, function (err, token) {
        if (err) return console.error(`error with ${stringifyJson(err)}`);
        cb(token);
    });
};

const decodeToken = (token, cb) => {
    if (!token || !cb) return console.error(`signToken fail with token: ${token}`);
    var cert = fs.readFileSync('public.pem'); // get public key
    jwt.verify(token, CERT_PUBLIC, ALGORITHM, function (err, payload) {
        if (err) return console.error(`error with ${stringifyJson(err)}`);
        cb(payload);
    });
};

module.exports = {
    createPassword,
    parseJson,
    stringifyJson,
    signToken,
    decodeToken
}