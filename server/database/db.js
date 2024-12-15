const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Menggunakan promise wrapper
const dbPromise = db.promise();

db.connect((err) => {
  if (err) {
    console.error('Gagal terhubung ke database MYSQL, muncul error:', err.stack);
    return;
  }
  console.log('Berhasil terhubung ke database MYSQL!');
});

module.exports = dbPromise;
