import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatBox from '../components/ChatBox';
import ChatInput from '../components/ChatInput';

let socket;

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket = io(); // Connect to the server

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to the server');
    });

    socket.on('chatMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off();
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit('chatMessage', message); // Send message to the server
  };

  return (
    <div className="container">
      <h1 className="heading">Welcome to the Chat App</h1>
      <ChatBox messages={messages} />
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default Home;
