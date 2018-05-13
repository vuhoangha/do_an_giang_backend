const mysql = require('mysql');
const MysqlDb = require('../helper/mysqldb');
const enumValue = require('../common/enum');
const util = require('../helper/util');

class UserInfo {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    register() {
        if (!this.req
            || !this.req.body
            || !this.req.body.data
            || !this.req.body.data.user_name
            || !this.req.body.data.password) res.sendStatus(400);
        const user = this.req.body.data.user_name;
        const password = this.req.body.data.password;
        const newPassword = util.createPassword(password);
        const db = new MysqlDb();

        db.init(success => {
            if (!success) return this.res.sendStatus(400);

            const query = `INSERT INTO ${enumValue.TBL.USER_INFO} 
                            (${enumValue.FIELD.USER_INFO.USER_NAME}, ${enumValue.FIELD.USER_INFO.PASSWORD})
                            VALUES ('${user}', '${newPassword}');`
            db.query(query, (error, results, fields) => {
                if (error) return this.res.sendStatus(400);
                if (results) return this.res.sendStatus(200);
                return this.res.sendStatus(400);
            });
        });
    };

    login() {
        if (!this.req
            || !this.req.body
            || !this.req.body.data
            || !this.req.body.data.user_name
            || !this.req.body.data.password) res.sendStatus(400);
        const user = this.req.body.data.user_name;
        const pass = this.req.body.data.password;
        const password = util.createPassword(pass);
        const db = new MysqlDb();

        db.init(success => {
            if (!success) return this.res.sendStatus(400);

            const query = `SELECT * FROM ${enumValue.TBL.USER_INFO}
                WHERE ${enumValue.FIELD.USER_INFO.USER_NAME} = '${user}' AND  ${enumValue.FIELD.USER_INFO.PASSWORD} = '${password}'`;

            db.query(query, (error, results, fields) => {
                if (error) return res.sendStatus(400);
                if (!results || results.length <= 0) return res.sendStatus(400);

                return util.signToken(user, token => {
                    res.send(token);
                });
            });
        })
    };
}

module.exports = UserInfo;

