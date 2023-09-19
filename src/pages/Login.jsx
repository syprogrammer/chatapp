import React, { useState } from 'react'
import {  signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const Login = () => {
  const [Err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target['email'].value
    const password = e.target['password'].value
    try {
      await  signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (error) {
      console.log(error)
      setErr(error)
    }
       
  }

  return (
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">SyChat</span>
          <span className="title">Login</span>

          <form onSubmit={handleSubmit}>

            <input type="email" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />

            <button>Sign in</button>
          </form>
          <p>You don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    )
  }

  export default Login