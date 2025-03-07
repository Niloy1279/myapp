import { useState } from 'react';
import ChatBox from '../components/ChatBox';
import ChatInput from '../components/ChatInput';

export default function Home() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {
    const userMessage = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
  };

  return (
    <div className="chat-container">
      <h1>My Custom Chat App</h1>
      <ChatBox messages={messages} />
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}