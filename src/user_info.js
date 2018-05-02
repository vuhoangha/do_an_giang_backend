const mysql = require('mysql');
const MysqlDb = require('../helper/mysqldb');
const enumValue = require('../common/enum');
const util = require('../helper/util');

class UserInfo {
    constructor() { }

    register(user, password, callback) {
        if (!user || !password || !callback) return false;

        const newPassword = util.createPassword(password);
        const db = new MysqlDb();

        db.init(success => {
            if (!success) return callback(false);

            const query = `INSERT INTO ${enumValue.TBL.USER_INFO} 
                            (${enumValue.FIELD.USER_INFO.USER_NAME}, ${enumValue.FIELD.USER_INFO.PASSWORD})
                            VALUES ('${user}', '${newPassword}');`
            db.query(query, (error, results, fields) => {
                if (error) return callback(false);
                if (results) return callback(true);
                return callback(false);
            });
        })
    };

    login(user, password, callback) {
        if (!user || !password || !callback) return false;

        const db = new MysqlDb();

        db.init(success => {
            if (!success) return callback(false);

            const query = `SELECT * FROM ${enumValue.TBL.USER_INFO}
                WHERE ${enumValue.FIELD.USER_INFO.USER_NAME} = '${user}' AND  ${enumValue.FIELD.USER_INFO.PASSWORD} = '${password}'`;

            db.query(query, (error, results, fields) => {
                if (error) return callback(null);
                if (results) return callback(results);
                return callback(null);
            });
        })
    };
}

module.exports = UserInfo;

