const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// const dbConfig = {
//     host: 'localhost',
//     user: 'root',
//     database: 'project',// Include your actual password here
// };

// let dbConnection;

// const connectDB = () => {
//     dbConnection = mysql.createConnection(dbConfig);

//     dbConnection.connect((err) => {
//         if (err) {
//             console.error('Error connecting to the database:', err);
//             return;
//         }
//         console.log('Connected to the database');
//     });
// };

// connectDB();
module.exports = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const query = 'INSERT INTO user (Username, Email, Password) VALUES (?, ?, ?)';
        dbConnection.query(query, [username, email, hashedPassword], async (err, results) => {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).send('Internal Server Error');
            }

            console.log('Success Register');
            res.redirect('/');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
