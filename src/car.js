const mysql = require('mysql');
const MysqlDb = require('../helper/mysqldb');
const enumValue = require('../common/enum');
const util = require('../helper/util');

class Car {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    add() {
        if (!this.req
            || !this.req.body
            || !this.req.body.data) this.res.sendStatus(400);
        const data = this.req.body.data;

        // check valid data
        if (data.name == null
            || data.producer == null
            || data.capacity == null
            || data.km == null
            || data.type == null
            || data.license_plates == null
            || data.user_name == null
        ) return this.res.sendStatus(400);

        const newCar = {
            image: data.image ? data.image : null,
            name: data.name,
            producer: data.producer,
            capacity: data.capacity,
            km: data.km,
            type: data.type,
            license_plates: data.license_plates,
            user_name: data.user_name
        };

        const db = new MysqlDb();
        db.init(success => {
            if (!success) return this.res.sendStatus(400);

            const query = `INSERT INTO ${enumValue.TBL.USER_CAR} 
                            (${enumValue.FIELD.USER_CAR.IMAGE}, ${enumValue.FIELD.USER_CAR.NAME},${enumValue.FIELD.USER_CAR.PRODUCER},${enumValue.FIELD.USER_CAR.CAPACITY},${enumValue.FIELD.USER_CAR.KM},${enumValue.FIELD.USER_CAR.TYPE},${enumValue.FIELD.USER_CAR.LICENSE_PLATES},${enumValue.FIELD.USER_CAR.USER_NAME})
                            VALUES ('${newCar.image}', '${newCar.name}', '${newCar.producer}', '${newCar.capacity}', '${newCar.capacity}', '${newCar.km}', '${newCar.type}', '${newCar.license_plates}', '${newCar.user_name}');`;

            db.query(query, (error, results, fields) => {
                if (error) return this.res.sendStatus(400);
                return this.res.sendStatus(200);
            });
        });
    }

    getMyCar() {
        if (!this.req || !this.req.headers || !this.req.headers.token) this.res.sendStatus(400);
        const token = this.req.headers.token;
        util.decodeToken(token, payload => {
            if (!payload || !payload.id) this.res.sendStatus(400);
            const userName = payload.id;
            const query = `SELECT * FROM ${enumValue.TBL.USER_CAR}
                  WHERE ${enumValue.FIELD.USER_CAR.USER_NAME} = '${userName}'`;

            db.query(query, (error, results, fields) => {
                if (error) return this.res.sendStatus(400);
                return this.res.send({
                    data: results
                });
            });
        });
    }
}

module.exports = Car;

