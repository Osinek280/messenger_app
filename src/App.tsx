import { useContext } from 'react'
import ContactsList from './components/Contacts/ContactsList';
import ChatWindow from './components/ChatWindow/ChatWindow';
import HomePage from './HomePage/HomePage';
import { UserContext } from './userContext';
import './App.css';

function App() {
  const { isUserLogin } = useContext(UserContext)

  return (
    <div className="App">
      {isUserLogin ? (
        <>
          <ContactsList /> 
          <ChatWindow />
        </>
      ) : (
        <HomePage />
      )}
    </div>
  );
}

export default App;
