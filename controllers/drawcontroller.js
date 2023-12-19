const User = require('../models/User')
const Drawing = require('../models/Drawing')

module.exports =  async (req, res) => {
    const query = 'SELECT * FROM user WHERE UserID = ?';
    const  query1 = 'SELECT * FROM drawing WHERE _id = ?';
    const myDrawing  = await queryMySQL(query1, [req.params.id]);
    const user1  = await queryMySQL(query, [req.session.userId]);
    // let UserData = await User.findById(req.session.userId)
    // const did = await Drawing.findById(req.params.id)
    // console.log("did");
    // console.log(did);
    res.render('products',{UserData:user1[0], did:myDrawing[0]})
}
