const proyect = require('../../../config.js');
const mysql = require('mysql');

const query = (sql) => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: proyect.db_host,
            user: proyect.db_user,
            password: proyect.db_pass,
            database: proyect.db_name,
            port: proyect.db_port
        });
        connection.connect();
        connection.query(sql, (error, results, fields) => {
            if (error) {
                return reject(false);
            } else {
                resolve(results);
            }
        });
        connection.end();
    });
}

module.exports = query;