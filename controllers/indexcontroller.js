const User = require('../models/User')
const Drawing = require('../models/Drawing')
const mysql = require('mysql2');

// create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'project'
});
global.pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'project',
});
module.exports = async (req,res)=>{
    const a = req.session.userId
    let getPostsQuery = 'SELECT * FROM drawing ORDER BY UploadDate DESC';
    let post = await queryMySQL(getPostsQuery);
    const query = 'SELECT  * FROM user WHERE UserID = ?';
connection.query(query,[a], (error, results, fields) => {
  if (error) throw error;

  // Process results here
  console.log(results);
  res.render("index",{UserData:results[0],Post:post})
});
}


global.queryMySQL = (query, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values , async (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}
