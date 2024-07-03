import React from 'react'
import './Application.css'
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const NavProfile = () => {
    let [profile, setProfile] = useState()

    useEffect(() => {
        const tokenDetails = localStorage.getItem('token')
        const decodeedToken = jwtDecode(tokenDetails)
        axios.get(`http://localhost:8081/profile/${decodeedToken.userLogin._id}`)
            .then((res) => {
                setProfile(res.data)
            })
    }, [])
    return (
        <Link to='/merchant/profile'>
            <div className='profileimage'><img src={profile} alt="profile" width='50px' /></div>
        </Link>

    )
}

export default NavProfile
