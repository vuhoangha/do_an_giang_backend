const crypto = require('crypto');
const KEY = '@fqu_-wBM!cWZ8Cp';

const createPassword = text => {
    if (text == null || text === '') return false;
    return crypto.createHmac('sha256', KEY).update(text).digest('hex');
};

module.exports = {
    createPassword
}