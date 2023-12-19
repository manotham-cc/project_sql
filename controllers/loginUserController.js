const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    database: 'project', // Include your actual password here
};

let dbConnection;

const connectDB = () => {
    dbConnection = mysql.createConnection(dbConfig);

    dbConnection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database');
    });
};

connectDB();

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body;
        const query = 'SELECT * FROM user WHERE Email = ?';

        const results = await new Promise((resolve, reject) => {
            dbConnection.query(query, [email], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        if (results.length > 0) {
            const user = results[0];
            console.log(user);
            const match = await bcrypt.compare(password, user.Password);

            if (match) {
                req.session.userId = user.UserID;
                return res.redirect('/');
            } else {
                req.flash('passworderror', 'Incorrect Password');
                return res.redirect('/login_or_register');
            }
        } else {
            req.flash('emailerror', 'Email does not exist');
            return res.redirect('/login_or_register');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};