const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');
// const bcrypt = require('bcrypt')


const app = express();

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

app.get('/data', async (req, resp) => {
    const data = await productModel.find();
    resp.send(data);
});


// app.get('/search/:key', async (req, resp) => {
//     console.log(req.params.key);
//     const data = await productModel.find(
//         {
//             "$or": [
//                 { name: { $regex: req.params.key } }
//             ]
//         }
//     );
//     console.log(data);
//     resp.end()
// })


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

app.post('/create', async (req, resp) => {
    const data = new productModel(req.body)
    const result = await data.save();
    console.log(result);
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
});


