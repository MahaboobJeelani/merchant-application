import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LoginPage = () => {
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')


  let handleLogin = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:8081/verifybyemail?email=${email}.com&password=${password}`)
      .then(() => { console.log("Login succesfully") })
      .catch((err) => { console.log(err); })
  };

  return (
    <div>
      <form action="">
        <label htmlFor="">Email</label>
        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <label htmlFor="">Password</label>
        <input type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <button onClick={handleLogin}>Submit</button>
      </form>
    </div>
  )
}

export default LoginPage
