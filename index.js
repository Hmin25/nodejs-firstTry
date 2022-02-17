const express = require('express');
const app = express();
const port = 3000; // Normally people will use either 3000 or 8000
require('dotenv').config();
const dbConn = require('./db.config');
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/user-list', (req, res) => {
dbConn.query(
    "SELECT * FROM interest_pitrees", (err, result) => {
        if (err) {
            res.send('TABLE DOES NOT EXIST');
            throw err;
        } else if (result.length > 0) {
            console.log(result)
        }
    }
)
// })


app.post('/register-interest', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let subject = req.body.subject;
    let content = req.body.content;
    let date = new Date();

    let data = { username, email, subject, content, date };

    dbConn.query(
        "SELECT * FROM interest_pitrees WHERE email = ?", email, (err, result) => {
            if (err) {
                res.send('TABLE DOES NOT EXIST');
                throw err;
            }
            else if (result.length > 0) {
                res.send({ error: true, message: "Sorry, seems like you've already register interest to us before." })
            }
            else {
                dbConn.query(
                    "INSERT INTO interest_pitrees set ?", data, (err, response) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send({ error: false, message: "You have successfully registered interest to Pitrees! Yay 🎉🎉🎉." })
                        }
                    }
                )
            }
        }
    )
})


app.listen(port, () => {
    console.log('Server is now running at', port);
})