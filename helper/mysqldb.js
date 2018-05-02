const mysql = require('mysql');

class MysqlDb {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'sql12.freemysqlhosting.net',
            user: 'sql12235892',
            password: '8NJSDJg4R4',
            database: 'sql12235892'
        });
        this.connected = false;
    }
    init(callback) {
        if (!callback) return;
        this.connection.connect(err => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return callback(false);
            }

            console.log('connected as id ' + this.connection.threadId);
            this.connected = true;
            return callback(true);
        });
    }
    query(str, callback) {
        if (!this.connected) return callback('NOT CONNECTED');
        return this.connection.query(str, callback);
    }
    terminate() {
        if (this.connected === true) connection.end();
    }
};

module.exports = MysqlDb;