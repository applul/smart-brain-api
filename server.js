const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs'); 

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
            id: 125,
            name: "BB",
            email: "BB-chan@Kouhai-mail.com",
            password: "Senpai",
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: 987,
            hash: '',
            email: 'Holo@Wolf-mail.com',
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
    bcrypt.compare("Apples", '$2a$10$2Erdintx9inH5UDZH3tvU.XpiimaO.k74ozGwxFuhb5ozGJ2bSXXu'
     , function(err, res) {
        console.log('first guess', res)
    });
    bcrypt.compare("veggies", '$2a$10$2Erdintx9inH5UDZH3tvU.XpiimaO.k74ozGwxFuhb5ozGJ2bSXXu', function(err, res) {
        console.log('second guess', res)
    }); 
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
    // bcrypt.hash("Apples", null, null, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    });
    const { email, name, password } = req.body;
    database.users.push({
        id: 126, 
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1])
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    console.log("Holo's id", id);
    function loopUsers() {
        for (i = 0; i < database.users.length; i++) {
            if (database.users[i].id == id) {
               return res.json(database.users[i]);
            }
        } 
        return res.status(400).json("no such user");
    }
    loopUsers(); 
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    function loopUsers() {
        for (i = 0; i < database.users.length; i++) {
            if (database.users[i].id == id) {
                database.users[i].entries ++;
               return res.json(database.users[i].entries);
            }
        }
        return res.status(400).json("no such user");
    }    
    loopUsers();
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