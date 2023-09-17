import React from 'react'

const Login = () => {
  return (
    <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">SyChat</span>
                <span className="title">Login</span>

                <form>
                   
                    <input type="email" name="email" id="email" placeholder="email" />
                    <input type="password" name="password" id="password" placeholder="password" />
                  
                    <button>Sign in</button>
                </form>
                <p>You don't have an account? Register</p>
            </div>
        </div>
  )
}

export default Login