import './Application.css'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavProfile from './NavProfile';


const Home = () => {
    let [searchQuery, setSearchquery] = useState('')
    let navigation = useNavigate()

    let handleSearch = () => {
        navigation(`/merchant/fetch?search=${searchQuery}`)
    };


    return (
        <div className='navbar'>

            <div className='products'>
                <Link className='producttext' to='/merchant/fetch' >StockHub</Link>
            </div>

            <div className='searchbar'>
                <input type="text"
                    className='textfield'
                    placeholder='Search for products'
                    value={searchQuery}
                    onChange={(e) => setSearchquery(e.target.value)} />

                <button className='searchbtn' onClick={handleSearch}>Search</button>
            </div>

            <div className='productslinks'>

                <Link className='navlink' to='/merchant/create'>Create Data</Link>
                <Link className='navlink' to='/merchant/fetch'>DataBase</Link>

            </div>
            <div className='profile'>

                <NavProfile />

            </div>
        </div>
    )
}

export default Home