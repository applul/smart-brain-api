const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

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

app.get('/', (req, res) => {
    res.send(database.users);
})

app.get("/", (req, res) => {
    res.send('this is working'); 
})

app.post("/signin", (req, res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json('success!')
            console.log("working here too")
        } else {
            res.status(400).json("Error logging in");
            console.log('error, but working here too')
        }
})

app.post("/register", (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: 123, 
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1])
})

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    database.users.forEach((user) => {
        if (user.id === id) {
            res.json(user);
        } else {
            res.status(404).json('no such user')
        }
    })
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