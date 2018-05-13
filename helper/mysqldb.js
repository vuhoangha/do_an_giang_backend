const mysql = require('mysql');

class MysqlDb {
    constructor() {
        this.connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'mycar'
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