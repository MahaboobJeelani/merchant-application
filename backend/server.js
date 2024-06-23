const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const loginData = require('./mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
require('dotenv').config();


const app = express();

const saltRounds = 10;

mongoose.connect('mongodb://0.0.0.0:27017/e-comm')

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    brand: String,
    category: String
})

const productModel = mongoose.model('products', productSchema)

app.use(cors());
app.use(express.json());


let sendmailMiddleware = async (req, resp, next) => {
    const { username, email, password } = req.body;
    const bcryptPassword = await bcrypt.hash(password, 10 || saltRounds)
    const createMerchantAccount = new loginData({ username: username, email: email, password: bcryptPassword })
    await createMerchantAccount.save();
    req.email = email
    next();
}

app.post('/register', sendmailMiddleware, async (req, resp) => {

    const mailsend = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "luckyjoy765@gmail.com",
            pass: "rkwm odwi miwy pntv"
        }
    });

    const recevier = {
        from: "luckyjoy765@gmail.com",
        // to mail come from sendmail middleware
        to: req.email,
        subject: "Merchant account is active..........",
        text: "Congratulations on registering! Your merchant account is active. Start managing your business seamlessly today.",
    }

    mailsend.sendMail(recevier, (err, emailResponse) => {
        if (err) console.log(err);
        resp.status(201).send({ message: "Merchant account created successfully", emailResponse });
    })
});

app.post('/login', async (req, resp) => {
    const { email, password } = req.body;
    const userLogin = await loginData.findOne({ email: email })
    console.log(userLogin);
    const bcryptComparePassword = await bcrypt.compare(password, userLogin.password)

    if (!userLogin) {
        return resp.send("invalid credentials")
    }
    if (bcryptComparePassword === false) {
        return resp.send("password is invalid")
    }
    const token = jwt.sign({ userLogin }, process.env.secretKet, { expiresIn: '2m' })
    resp.json({ token, message: "Login Successfully" })
});

const verifyToken = (req, resp, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        req.token = token;
        next()
    } else {
        resp.send({ result: "token is invalid" })
    }
}

app.post('/create', verifyToken, async (req, resp) => {
    const verifyToken = jwt.verify(req.token, process.env.secretKet);

    if (verifyToken) {
        const data = new productModel(req.body)
        const result = await data.save();
        resp.send({ result, message: "Token is Valid" })
    } else {
        resp.send('Token invalid')
    }
})

app.get('/data', async (req, resp) => {
    const data = await productModel.find();
    resp.json(data)
});

app.get('/data/:id', async (req, res) => {
    try {
        const data = await productModel.findById(req.params.id);
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({ message: 'Data not found' });
        }
    }
    catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

app.put('/edit/:_id', async (req, resp) => {
    const data = await productModel.updateOne(req.params, { $set: req.body })
    console.log(data)
})

app.delete('/delete/:_id', async (req, resp) => {
    let data = await productModel.deleteOne(req.params)
    console.log(data)
})

app.listen(8081, () => {
    console.log('Server is running on port 8081');
})


