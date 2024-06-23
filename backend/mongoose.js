const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/e-comm')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const userLoginDataModel = mongoose.model('logindata', userSchema);

module.exports = userLoginDataModel;
