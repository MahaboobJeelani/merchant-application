import axios from 'axios'
import React, { useState } from 'react'

const CreateData = () => {
    let [name, setName] = useState('')
    let [price, setPrice] = useState('')
    let [brand, setBrand] = useState('')
    let [category, setCategory] = useState('')

    let handleSubmit = (e) => {
        e.preventDefault()
        let payLoad = {
            name: name,
            price: price,
            brand: brand,
            category: category
        }
        axios.post(`http://localhost:8081/create`, payLoad)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log("==>", err))
        setName('');
        setPrice('');
        setBrand('');
        setCategory('')
        console.log(name, price, brand, category);
    }

    return (
        <>
            <div className='form-container'>
                <div className='form-conta'>
                    <h2>Create Products</h2>
                    <form className='createfrom'>
                        <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} /> <br />
                        <input type="text" placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} /> <br />
                        <input type="text" placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)} /> <br />
                        <input type="text" placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)} /> <br />
                        <div className='productbtn'>
                            <button className='btn' onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateData
