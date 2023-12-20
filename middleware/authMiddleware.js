
module.exports = async (req,res,next)=>{
    const a = req.session.userId
    const query = 'SELECT * FROM user WHERE UserID = ?';
dbConnection.query(query,[a], (error, results, fields) => {
  if (error) throw error;
  console.log(results);
  if (!results){
    return res.redirect('/login_or_register')
    
  }
  next()
  

  // Process results here
//   console.log(results);
//   res.render("create",{UserData:results[0],Post:a})
});
}