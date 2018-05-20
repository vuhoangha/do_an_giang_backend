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
            || !this.req.body.data.display_name
            || !this.req.body.data.password) return this.res.sendStatus(400);
        const user = this.req.body.data.user_name;
        const password = this.req.body.data.password;
        const displayName = this.req.body.data.display_name;
        const newPassword = password;
        const db = new MysqlDb();

        db.init(success => {
            if (!success) return this.res.sendStatus(400);

            const query = `INSERT INTO ${enumValue.TBL.USER_INFO} 
                            (${enumValue.FIELD.USER_INFO.USER_NAME}, ${enumValue.FIELD.USER_INFO.PASSWORD},${enumValue.FIELD.USER_INFO.DISPLAY_NAME})
                            VALUES ('${user}', '${newPassword}', '${displayName}');`
            db.query(query, (error, results, fields) => {
                if (error) return this.res.sendStatus(400);
                if (results) return this.res.sendStatus(200);
                return this.res.sendStatus(400);
            });
        });
    };

    update() {
        if (!this.req
            || !this.req.body
            || !this.req.body.data
            || !this.req.body.data.user_name
            || !this.req.body.data.display_name
            || !this.req.body.data.password) return this.res.sendStatus(400);
        const user = this.req.body.data.user_name;
        const password = this.req.body.data.password;
        const displayName = this.req.body.data.display_name;
        const newPassword = password;
        const db = new MysqlDb();

        db.init(success => {
            if (!success) return this.res.sendStatus(400);

            const query = `UPDATE ${enumValue.TBL.USER_INFO} 
                            SET ${enumValue.FIELD.USER_INFO.PASSWORD}=${password},
                                ${enumValue.FIELD.USER_INFO.DISPLAY_NAME}=${displayName}
                            WHERE '${user}'=${user};`
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
            || !this.req.body.data.password) return this.res.sendStatus(400);
        const user = this.req.body.data.user_name;
        const pass = this.req.body.data.password;
        const password = pass;
        const db = new MysqlDb();

        db.init(success => {
            if (!success) return this.res.sendStatus(400);

            const query = `SELECT * FROM ${enumValue.TBL.USER_INFO}
                WHERE ${enumValue.FIELD.USER_INFO.USER_NAME} = '${user}' AND  ${enumValue.FIELD.USER_INFO.PASSWORD} = '${password}'`;

            db.query(query, (error, results, fields) => {
                if (error) return this.res.sendStatus(400);
                if (!results || results.length <= 0) return this.res.sendStatus(400);

                return util.signToken(user, token => {
                    this.res.send({
                        data: {
                            token,
                            display_name: results[0].display_name,
                            user_name: results[0].user_name,
                        }
                    });
                });
            });
        });
    };
}

module.exports = UserInfo;

