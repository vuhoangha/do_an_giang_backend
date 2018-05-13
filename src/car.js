const mysql = require('mysql');
const MysqlDb = require('../helper/mysqldb');
const enumValue = require('../common/enum');
const util = require('../helper/util');

class UserInfo {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    login() {
        
    };
}

module.exports = UserInfo;

