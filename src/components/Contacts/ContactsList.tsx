import { useContext, useEffect, useState } from 'react';
import './ContactsList.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ApiContext } from '../../ApiContext';
import logOutIcon from '../../icon/log-out.svg';

function ContactsList(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const conversationId = location.pathname.substring(1);
  const { conversations } = useContext(ApiContext);
  const userToken = localStorage.getItem('userToken');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (conversationId === '') {
      console.log('now');
      if (conversations.length > 0) setPatch(conversations[0].conversationId);
    }
  }, [conversationId, conversations]);

  const setPatch = (conversationId: string): void => {
    navigate(`/${conversationId}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const filteredConversations = conversations.filter((item) =>
    item.secondUserName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contact-container">
      <span className="message-header">Messages</span>
      <input
        className="search-message-input"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="contact-list-container">
        {filteredConversations.map((item, index) => (
          <Link to={`/${item.conversationId}`} key={index} className="message-user">
            <span className="message-user-prof">
              <img src={item.secondUserImage} alt="" />
            </span>
            <span className="message-type">
              <span className="message-user-name">{item.secondUserName}</span>
              <span className="last-message">
                <p>
                  {item.lastMessage.ownerId === userToken
                    ? `You: ${item.lastMessage.title}`
                    : item.lastMessage.title}
                </p>
              </span>
            </span>
          </Link>
        ))}
      </div>
      <span
        className="log-out-btn"
        onClick={() => {
          localStorage.removeItem('userToken');
          window.location.reload();
        }}
      >
        <img src={logOutIcon} alt="log-out-btn" />
      </span>
    </div>
  );
}

export default ContactsList;
