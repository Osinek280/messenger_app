import React from 'react';
import { Link } from "react-router-dom";

function RegisterModal () {
  return(
    <div className="register-box">
      <h2>Register</h2>
      <form>
        <div className="user-box">
          <input
            type="text"
            name="username"
            required
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="email"
            name="email"
            required
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type='password'
            name="password"
            required
          />
          <label>Password</label>
          <span className="deputy"></span>
        </div>
        <Link to={'/login'} className="toggle_label">
          <p>Login</p>
        </Link>
        <button type="submit" className='register-submit-btn'>Submit</button>
      </form>
    </div>
  )
}

export default RegisterModal;