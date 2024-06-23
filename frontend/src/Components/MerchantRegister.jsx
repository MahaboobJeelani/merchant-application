import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../CssFiles/MerchantRegister.css'

const MerchantRegister = () => {
  let [username, setUsername] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')

  let navigate = useNavigate()

  let handleRegister = (e) => {
    e.preventDefault()
    let payload = {
      username: username,
      email: email,
      password: password
    }
    axios.post('http://localhost:8081/register', payload)
      .then(() => {
        navigate('/')
        console.log("Merchant succesfully Register")
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <label htmlFor="username">Username :</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label htmlFor="email">Email :</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password :</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default MerchantRegister
