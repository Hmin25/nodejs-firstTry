'use strict'

const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.USER,
    // port: '3306',
    password: process.env.PASSWORD,
    database: 'test_users',
});


dbConn.connect(function(err) {
    if (err) throw err;
    console.log('Database Connected');
})


module.exports = dbConn;