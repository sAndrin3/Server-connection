import React, { useState, useEffect } from 'react';
import './Message.css'

function Message({ adminId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch messages from the database
  useEffect(() => {
    // Add logic to fetch messages for the current user from the database
    // and update the 'messages' state
    const fetchMessages = async () => {
      try {
        // Fetch messages for the current user
        const response = await fetch(`/api/messages?adminId=${adminId}`);
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [adminId]);

  const handleMessageSend = () => {
    // Add logic to send the message to the admin and update the database
    console.log(`Send message to admin with ID: ${adminId}`);
    console.log(`Message content: ${message}`);

    // Clear the message input
    setMessage('');
  };

  return (
    <div className='up'>
         <div className="message-section">
      <h2>Message Section</h2>
      <div className="message-list">
        {messages.map((message) => (
          <div className="message-item" key={message.id}>
            <p>{message.content}</p>
            <span>{message.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="message-input">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        ></textarea>
        <button onClick={handleMessageSend}>Send</button>
      </div>
    </div>
    </div>
   
  );
}

export default Message;
