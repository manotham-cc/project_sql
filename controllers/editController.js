const User = require('../models/User')
const Drawing = require('../models/Drawing')

module.exports =  async (req, res) => {
    console.log(req.body);
    const query = 'SELECT * FROM user WHERE UserID = ?';
    const  query1 = 'SELECT * FROM drawing WHERE _id = ?';
    const  query2 = 'UPDATE drawing SET description = ?,  price = ?, title = ? WHERE _id = ?';
    const UserData  = await queryMySQL(query, [req.params.id]);
    const myDrawing  = await queryMySQL(query1, [req.params.id]);
    const Update = await queryMySQL(query2, [req.body.description,req.body.price,req.body.title,req.params.id]);
    // let UserData = await User.findById(req.session.userId)
    // const did = await Drawing.findById(req.params.id)
    // console.log("did");
    // console.log(did);
    console.log(req.body);

    // const update = await Drawing.findByIdAndUpdate(req.params.id, req.body)
    if (!Update) {
        throw new Error('User not found');
      }
    console.log("Update sucessfully");

    res.redirect(`/profile/${req.session.userId}`)
    
    // res.render('products',{UserData, did})
    
}