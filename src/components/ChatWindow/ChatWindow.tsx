import { useContext, useState } from 'react';
import './ChatWindow.css';
import likeIcon from '../../icon/like.svg';
import sendIcon from '../../icon/send.svg';
import emoticonIcon from '../../icon/emoticons.svg';
import Messages from '../Messages/Messages';
import { ApiContext } from '../../ApiContext';
import { useLocation } from 'react-router-dom';
import EmoticonSelector from '../emoticonSelector/emoticonSelector';

function ChatWindow() {
  const location = useLocation();
  const conversationId = location.pathname.substring(1);

  const { sendMessage, conversations } = useContext(ApiContext);

  const [emoticonVisible, setEmoticonVisible] = useState(false);

  const conversation = conversations?.find((el) => el.conversationId === conversationId);

  const secondUserName = conversation?.secondUserName || 'DefaultUserName';
  const secondUserImage = conversation?.secondUserImage || 'DefaultUserImageURL';

  const [messageValue, setMessageValue] = useState('');

  const setEmoticon = (character: string) => {
    setMessageValue(messageValue + character)
    setEmoticonVisible(false);
  };

  return (
    <div className="chat-container">
      <nav className="chat-header">
        <span className="chat-user-prof">
          <img src={secondUserImage} alt="" />
        </span>
        <span className="chat-user-name">{secondUserName}</span>
      </nav>
      <Messages conversation={conversation} />
      <form
        className="write-message-box"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(messageValue);
          setMessageValue('');
        }}
      >
        <div className="emoticon-box">
          <button
            className="emoticon-btn"
            type="button"
            onClick={() => setEmoticonVisible(!emoticonVisible)}
          >
            <img src={emoticonIcon} alt="emoticons" />
          </button>
          {emoticonVisible && <EmoticonSelector onClose={setEmoticon} />}
        </div>
        <input
          placeholder="Aa"
          className="write-message-input"
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
        />
        {messageValue === '' ? (
          <button
            className="like-btn"
            onClick={(e) => {
              e.preventDefault();
              sendMessage('👍');
            }}
          >
            <img src={likeIcon} alt="" />
          </button>
        ) : (
          <button className="send-btn" type="submit">
            <img src={sendIcon} alt="" />
          </button>
        )}
      </form>
    </div>
  );
}

export default ChatWindow;