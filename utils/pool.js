const mysql = require("mysql");
const pool = mysql.createPool({
  host: '47.105.192.161',
  user: 'root',
  password: 'sumo123...',
  database: 'react',
  multipleStatements: true,
  port: 3306
});

function query(sql,values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql || '',values || [],(err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
};

module.exports = {
  query
}