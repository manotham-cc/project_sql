const Drawing = require('../models/Drawing')


module.exports = async (req, res) => {
    let DrawingId = req.params.id;
    console.log(DrawingId);
    
    const deleteQuery = 'DELETE FROM drawing WHERE _id = ?'; // Replace 'drawing' with your table name
  
    pool.query(deleteQuery, [DrawingId], (error, results) => {
      if (error) {
        console.error('Error occurred:', error);
        res.status(500).send('An error occurred while deleting the drawing.');
        return;
      }
      console.log('Drawing deleted');
      res.redirect('/');
    });
  };
  
    

         