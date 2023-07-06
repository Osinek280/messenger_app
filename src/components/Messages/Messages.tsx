import { useContext } from 'react';
import './Messages.css';
import { ApiContext } from '../../ApiContext';

interface Conversation {
  secondUserName: string;
  secondUserImage: string;
}

function Messages({ conversation }: { conversation: Conversation | undefined }) {
  const { messages } = useContext(ApiContext);
  const userId = localStorage.getItem('userToken');

  const secondUserName = conversation?.secondUserName || 'DefaultUserName';
  const secondUserImage = conversation?.secondUserImage || 'DefaultUserImageURL';

  return (
    <div className="messages-container">
      <div className='start-conversation-box'>
        <span className="message-user-prof" style={{ width: '120px', height: '120px' }}>
          <img src={secondUserImage} alt="img" />
        </span>
        <p>This is the beginning of your conversation with {secondUserName}</p>
      </div>
      {messages.map((mess, index) => (
        <div
          key={index}
          className="message-box"
          style={{
            justifyContent: mess.ownerId === userId ? 'end' : 'start',
          }}
        >
          <span
            className="message"
            style={{
              backgroundColor: mess.ownerId === userId ? '#0084ff' : '#e4e6eb',
              color: mess.ownerId === userId ? 'white' : 'black',
            }}
          >
            {mess.title}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Messages;
