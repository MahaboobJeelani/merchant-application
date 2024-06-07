import React, { useState } from 'react'
import './Application.css'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    let [searchQuery, setSearchquery] = useState('')
    let navigation = useNavigate()

    let handleSearch = () => {
        navigation(`/fetch?search=${searchQuery}`)
    };
    return (
        <div className='navbar'>
            <div className='products'>
                <Link className='producttext' to='/' >Products</Link>
            </div>
            <div className='searchbar'>
                <input type="text" className='textfield' placeholder='Search for products' value={searchQuery} onChange={(e) => setSearchquery(e.target.value)} />
                <button className='searchbtn' onClick={handleSearch}>Search</button>
            </div>
            <div className='productslinks'>
                <Link className='navlink' to='/'>Create Data</Link>
                <Link className='navlink' to='/fetch'>DataBase</Link>
            </div>
        </div>
    )
}

export default Home
