import React from 'react';
import './HomePage.css';
import LoginModal from '../components/LoginModal/LoginModal';
import RegisterModal from '../components/RegisterModal/RegisterModal';
import { Link } from 'react-router-dom';

function HomePage() {
  const MessengerLogo = 'https://static.xx.fbcdn.net/rsrc.php/yd/r/hlvibnBVrEb.svg';

  return (
    <div className='home-page-container'>
      <img className='mess-logo' src={MessengerLogo} alt='' />
      <h2>Stay in touch with your favorite people</h2>
          <div className='button-container'>
            <Link to={'/login'} className='login-btn'>Login</Link>
            <Link to={'/register'} className='register-btn'>Sign up</Link>
          </div>
          <LoginModal />
          <RegisterModal />
    </div>
  );
}

export default HomePage;
