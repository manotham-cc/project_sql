const mysql = require('mysql2');
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'project',
// });

module.exports = async (req, res) => {
  try {
    const buyId = req.session.userId; // User Id logged in
    const buyIdQuery = `SELECT * FROM user WHERE UserID = ?`;
    const buyer = await queryMySQL(buyIdQuery, [buyId]);

    const drawingId = req.params.buyID;
    const drawingQuery = `SELECT * FROM drawing WHERE _id = ?`;
    const drawing = await queryMySQL(drawingQuery, [drawingId]);

    const sellerQuery = `SELECT * FROM drawing WHERE UserID = ?`;
    console.log(drawing)
    const seller = drawing[0];

    const updateDrawingQuery = `UPDATE drawing SET OwnerID = ? WHERE _id = ?`;
    await queryMySQL(updateDrawingQuery, [buyId, drawingId]);

    const createTransactionQuery = `INSERT INTO transactions (buyyer, seller, DrawingID, price) VALUES (?, ?, ?, ?)`;
    console.log(typeof (buyId),parseInt(drawingId));
    const payment = await queryMySQL(createTransactionQuery, [buyId, seller.UserID, parseInt(drawingId), drawing[0].price]);
    if (!buyer || !seller || !drawing || !payment) {
      throw new Error('User or drawing not found');
    }

    console.log("Buy successful");
    res.render("buy");
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('An error occurred during the purchase process');
  }
}
