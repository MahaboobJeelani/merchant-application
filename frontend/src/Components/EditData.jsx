 
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditData = () => {
    let [name, setName] = useState('');
    let [price, setPrice] = useState('');
    let [brand, setBrand] = useState('');
    let [category, setCategory] = useState('');

    let { _id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8081/data/${_id}`)
            .then((res) => {
                setName(res.data.name);
                setPrice(res.data.price);
                setBrand(res.data.brand);
                setCategory(res.data.category);
            })
            .catch((err) => console.log(err));
    }, []);

    let handleEdit = (e) => {
        e.preventDefault();
        let payload = {
            name: name,
            price: price,
            brand: brand,
            category: category
        }
        axios.put(`http://localhost:8081/edit/${_id}`, payload)
            .then((res) => { console.log('Data updated in database', res) })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className='editproduct'>
                <form action="" className='editformdata'>
                    <label clas htmlFor="name">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br />
                    <label clas htmlFor="price">Price</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} /> <br />
                    <label clas htmlFor="brand">Brand</label>
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} /> <br />
                    <label clas htmlFor="category">Category</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} /> <br />
                    <button onClick={handleEdit}>Submit</button>
                </form>
            </div>
        </>
    );
};

export default EditData;
