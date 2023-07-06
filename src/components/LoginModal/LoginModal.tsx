import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../userContext';

function LoginModal() {
  const {setUserData} = useContext(UserContext)
  const navigate = useNavigate();

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { login, password } = event.currentTarget.elements as unknown as {
      login: { value: string };
      password: { value: string };
    };
    const loginData = {
      login: login.value,
      password: password.value,
    };
    console.log(loginData)
    try {
      const response = await fetch('http://localhost:8888/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setUserData(data.user, data.user.id)
      navigate('/')
    } catch (error) {
      console.error('Błąd:', error);
    }
  };

  return (
    <div className='login-box'>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div className='user-box'>
          <input type='text' name='login' required />
          <label>Login</label>
        </div>
        <div className='user-box'>
          <input type='password' name='password' required />
          <label>Password</label>
          <span className='deputy'></span>
        </div>
        <Link to={'/register'} className='toggle_label'>
          <p>Sign up</p>
        </Link>
        <button type='submit' className='login-submit-btn'>Submit</button>
      </form>
    </div>
  );
}

export default LoginModal;
