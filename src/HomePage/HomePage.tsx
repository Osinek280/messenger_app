import './HomePage.css';
import LoginModal from '../components/LoginModal/LoginModal';
import { Link } from 'react-router-dom';

function HomePage() {
  const MessengerLogo = 'https://static.xx.fbcdn.net/rsrc.php/yd/r/hlvibnBVrEb.svg';

  return (
    <div className='home-page-container'>
      <img className='mess-logo' src={MessengerLogo} alt='' />
      <h2>Stay in touch with your favorite people</h2>
          <LoginModal />
    </div>
  );
}

export default HomePage;
