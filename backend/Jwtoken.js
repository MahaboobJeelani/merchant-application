const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

mongoose.connect(`mongodb://0.0.0.0:27017/e-comm`)
    .then(() => {
        console.log("MongoDB is connected");
    })
const proSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const proModel = mongoose.model('logindata', proSchema)

const app = express()
app.use(express.json())
const port = 8081
const secretKey = "jeeCredencials"

app.post('/register', async (req, resp) => {
    const data = new proModel(req.body)
    const saveData = await data.save();
    console.log(saveData)
})

app.get('/', async (req, resp) => {
    const data = await proModel.find();
    resp.send(data);
})

app.post('/login', async (req, resp) => {
    const user = {
        id: 1,
        username: "anil",
        email: "anil123@gmail.com"
    }
    jwt.sign({ user }, secretKey, { expiresIn: "1h" }, (err, token) => {
        resp.token({ token })
    })

});


const verifyToken = (req, resp, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ")
        const token = bearer[1];
        req.token = token;
        next()
    } else {
        resp.send({
            result: 'Token is inValid'
        })
    }
}

app.post('/profile', verifyToken, (req, resp) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            resp.send({ result: "invalid Token" })
        } else {
            resp.send({
                message: "profile access",
                authData
            })
        }
    })
})

app.listen(port, () => {
    console.log(`server is running on the 'port' ${port}`)
})
