const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const loginData = require('./mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const multer = require('multer')
const fsextra = require('fs-extra')
const bodyparser = require('body-parser')
const path = require('path')
require('dotenv').config();


const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'))

const saltRounds = 10;

mongoose.connect('mongodb://0.0.0.0:27017/e-comm')

const productSchema = mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    brand: { type: String },
    category: { type: String }
})

const productModel = mongoose.model('products', productSchema)

const filePath = path.join(__dirname, 'uploads', 'profile')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fsextra.ensureDir(filePath)
            .then(() => cb(null, filePath))
            .catch((err) => cb(err, filePath))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({
    storage: storage
}).single('profile')


let sendmailMiddleware = async (req, resp, next) => {
    const { username, email, password } = req.body;
    try {
        const profile = req.file.filename;
        const bcryptPassword = await bcrypt.hash(password, saltRounds)
        const createMerchantAccount = new loginData({ username: username, email: email, password: bcryptPassword, profile: profile })
        await createMerchantAccount.save()
        req.email = email
        next();
    } catch (error) {
        resp.send(error.message)
    }
}


app.post('/register', upload, sendmailMiddleware, async (req, resp) => {
    try {
        const mailsend = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: "luckyjoy765@gmail.com",
                pass: "rkwm odwi miwy pntv"
            }
        })

        const recevier = {
            from: "luckyjoy765@gmail.com",
            // to mail come from sendmail middleware
            to: req.email,
            subject: "Merchant account is actived..........",
            text: "Congratulations on registering! Your merchant account is active. Start managing your business seamlessly today.",
        }

        mailsend.sendMail(recevier, (err, emailResponse) => {
            if (err) console.log(err);
            resp.status(200).send({ message: "login", emailResponse });
        })

    } catch (error) {
        resp.status(500).send(error.message)
    }
});

app.post('/login', async (req, resp) => {
    const { email, password } = req.body;
    try {
        const userLogin = await loginData.findOne({ email: email })

        const bcryptComparePassword = await bcrypt.compare(password, userLogin.password);

        if (!userLogin) {
            return resp.send("invalid credentials")
        }
        if (!bcryptComparePassword) {
            return resp.send("password is invalid");
        }

        const token = jwt.sign({ userLogin }, process.env.secretKet, { expiresIn: '1d' })
        resp.json({ token, message: "Login Successfully" })
    } catch (error) {
        resp.status(500).send(error.message)
    }
});

app.get('/profile/:id', async (req, resp) => {
    try {
        const merchantDetails = await loginData.findById(req.params.id)
        const merchantProfile = merchantDetails.profile
        resp.send(`http://localhost:8081/profile/${merchantProfile}`)
    } catch (error) {
        resp.send(error.message)
    }
})


app.put('/profile/upload/:email', upload, async (req, resp) => {
    const updateFile = req.file.filename
    try {
        const profileUpdate = await loginData.updateOne(
            req.params, { "profile": updateFile }
        )
        resp.status(200).send(profileUpdate)
    } catch (error) {
        resp.send(error.message)
    }
})

// const verifyToken = (req, resp, next) => {
//     const bearerHeader = req.headers['authorization']
//     if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(' ');
//         const token = bearer[1];
//         req.token = token;
//         next()
//     } else {
//         resp.send({ result: "token is invalid" })
//     }
// }

app.post('/create', async (req, resp) => {
    try {
        const data = new productModel(req.body)
        const result = await data.save();
        resp.send({ result, message: "Token is Valid" })
    } catch (error) {
        resp.status(500).send(error.message)
    }
})

app.get('/data', async (req, resp) => {
    try {
        const data = await productModel.find();
        resp.json(data)
    } catch (error) {
        resp.status(500).send(error.message)
    }
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
    try {
        const data = await productModel.updateOne(req.params, { $set: req.body })
    } catch (error) {
        resp.status(500).send(error.message)
    }
})

app.delete('/delete/:_id', async (req, resp) => {
    try {
        let data = await productModel.deleteOne(req.params)
    } catch (error) {
        resp.status(500).send(error.message)
    }
})


app.listen(8081, () => {
    console.log('Server is running on port http://localhost:8081');
})


