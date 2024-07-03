import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../CssFiles/MerchantRegister.css'

const MerchantRegister = () => {
  let [profile, setProfile] = useState(null)
  let [username, setUsername] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')


  let navigate = useNavigate()

  let handleRegister = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('profile', profile)
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)

    axios.post('http://localhost:8081/register', formData, { headers: { "Content-Type": "multipart/formData" } })
      .then((res) => {
        navigate('/')
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister} enctype="multipart/form-data">
        <h2>Register</h2>
        <input type="file" name='profile' onChange={(e) => setProfile(e.target.files[0])} />
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
