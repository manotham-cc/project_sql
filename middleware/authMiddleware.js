const User = require('../models/User')

module.exports = async (req,res,next)=>{
    const a = req.session.userId
    const query = 'SELECT * FROM user WHERE UserID = ?';
dbConnection.query(query,[a], (error, results, fields) => {
  if (error) throw error;
  if (!results){
    return res.redirect('/')

  }
  next()

  // Process results here
//   console.log(results);
//   res.render("create",{UserData:results[0],Post:a})
});
}