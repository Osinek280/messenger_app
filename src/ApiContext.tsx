import React, { createContext, useState, PropsWithChildren, useEffect, useContext } from 'react';
import { UserContext } from './userContext';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  title: string;
  ownerId: string;
  conversationId: string;
  date: number;
}

interface Conversation {
  conversationId: string;
  secondUserImage: string;
  secondUserName: string;
  lastMessage: Message;
}

type ApiContextType = {
  conversations: Conversation[];
  messages: Message[];
  sendMessage: (title: string) => void;
  fetchConversations: () => void;
};

const initialApiContext: ApiContextType = {
  conversations: [],
  messages: [],
  sendMessage: () => {},
  fetchConversations: () => {},
};

const ApiContext = createContext<ApiContextType>(initialApiContext);

const ApiProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {

  const location = useLocation();
  const conversationId = location.pathname.substring(1);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const userToken = localStorage.getItem('userToken');

  const { user } = useContext(UserContext);

  const sendMessage = (title: string) => {
    if (user) {
      fetch(`${process.env.API_URL}/messages`, {
        method: 'POST',
        body: JSON.stringify({ 
          title: title, 
          ownerId: user.id, 
          conversationId: conversationId, 
          date: Date.now() 
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => fetchMessages(conversationId))
      .catch(error => {
        console.error(error);
      });
    }
  }

  const fetchConversations = async () => {
    try {
      if (!userToken) {
        throw new Error('User token not found');
      }
      const url = `http://localhost:8888/conversations?userId=${encodeURIComponent(userToken)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }
      const data = await response.json();
      setConversations(data);
      fetchMessages(conversationId);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await fetch(`http://localhost:8888/messages/${conversationId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [conversationId]);

  return (
    <ApiContext.Provider value={{ conversations, messages, sendMessage, fetchConversations }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiProvider };