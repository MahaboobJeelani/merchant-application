import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Components/LoginPage.css'

const LoginPage = () => {
    let navigate = useNavigate();
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    let handleLogin = (e) => {
        e.preventDefault();
        try {
            axios.post(`http://localhost:8081/login`, { email: email, password: password })
                .then((res) => {
                    console.log(res);
                    if (res.data.message === 'Login Successfully') {
                        localStorage.setItem('token', res.data.token)
                        navigate('/merchant/create')
                    } else {
                        console.log("Invalid Credentials");
                    }
                })
        }
        catch (err) {
            console.error(err)
        }
    }


    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Login</h2>
                <p>{ }</p>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button onClick={handleLogin}>Login</button>

                <p className='registertext'>Don't have an account? <Link to="/register"> Register</Link> </p>
            </form>
        </div>
    )
}

export default LoginPage
