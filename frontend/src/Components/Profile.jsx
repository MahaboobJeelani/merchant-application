import '../CssFiles/Profile.css'
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



const Profile = () => {
    let [profile, setProfile] = useState()
    let [admin, setAdmin] = useState('')

    useEffect(() => {
        const tokenDetails = localStorage.getItem('token')
        const decodedToken = jwtDecode(tokenDetails)
        console.log(decodedToken);
        axios.get(`http://localhost:8081/profile/${decodedToken.userLogin._id}`)
            .then((res) => {
                setProfile(res.data)
                setAdmin(decodedToken.userLogin)
            })
    }, [])
    return (
        <div className='profiledata'>
            <div className='profiledetails'>
                <div className='profilepic'>
                    <div className='adminprofile'>
                        <img src={profile} className='profileimg' alt="profile" width='100%' />
                    </div>
                    <div className='admindata'>
                        <h2>{admin.username}</h2>
                        <h3>{admin.email}</h3>
                    </div>
                    <div className='logoutbtn'>
                        <button className='profilelogoutbtn'><Link className='profilelinkout' to='/'>Logout</Link></button>
                    </div>
                </div>

                <div className='admindetails'>
                    <div className='details'><span className='textcontent'>Products uploaded : 1200</span></div>
                    <div className='details'><span className='textcontent'>Sold Products : 250</span></div>
                    <div className='details'><span className='textcontent'>Completed Orders : 180</span></div>
                    <div className='details'><span className='textcontent'>Returned Products : 10</span></div>
                    <div className='details'><span className='textcontent'>Cancelled Orders : 10</span></div>
                    <div className='details'><span className='textcontent'>Pending Orders : 600</span></div>
                    <div className='details'><span className='textcontent'>Out of Stock Products : 50</span></div>
                    <div className='details'><span className='textcontent'>Total Orders : 250</span></div>
                    <div className='details'><span className='textcontent'>Total Revenue : 400000rs</span></div>
                </div>
            </div>
        </div>
    )
}

export default Profile
