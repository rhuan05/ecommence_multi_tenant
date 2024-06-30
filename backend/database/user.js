require('dotenv').config();
const sql = require('mssql');

const config = {
    server: process.env.SERVER,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    options: {
        trustedConnection: false,
        encrypt: false,
        trustServerCertificate: true
    },
};