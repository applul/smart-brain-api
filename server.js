const express = require('express');
const bodyParser = require('body-parser');

app.use(bodyParser.json)

const app = express();

const database = {
    users: [
        {
            id: 123,
            name: "Holo",
            email: "Holo@Wolf-mail.com",
            password: "Apples",
            entries: 0,
            joined: new Date()
        },
        {
            id: 124,
            name: "Artoria",
            email: "Artoria@Ahoge-mail.com",
            password: "Excalibur",
            entries: 0,
            joined: new Date()
        },
        {
            id: 124,
            name: "BB",
            email: "BB-chan@Kouhai-mail.com",
            password: "Senpai",
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get("/", (req, res) => {
    res.send('this is working'); 
})

app.post("/signin", (req, res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json('success!')
        } else {
            res.status(400).json("Error logging in");
        }
})

app. listen(3000, () => {
    console.log('app is running on port 3000');
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user 
*/