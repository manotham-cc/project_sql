const User = require('../models/User')

module.exports = async (req,res,next)=>{
    const a = req.session.userId
    const query = 'SELECT * FROM user WHERE UserID = ?';
dbConnection.query(query,[a], (error, results, fields) => {
  if (error) throw error;
  console.log(results);
  if (!results){
    next()
    
  }
  return res.redirect('/login_or_register')

  // Process results here
//   console.log(results);
//   res.render("create",{UserData:results[0],Post:a})
});
}