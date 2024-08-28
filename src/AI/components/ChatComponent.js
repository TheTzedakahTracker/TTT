// ChatComponent.js
import React, { useState } from 'react';
import { queryModel } from '../services/geminiService';

const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add user input to messages
    setMessages([...messages, { role: 'user', text: userInput }]);

    // Call the API and get the response
    const result = await queryModel(userInput);
    const responseText = result.contents[0]?.parts[0]?.text || 'No response';

    // Add the API response to messages
    setMessages([...messages, { role: 'user', text: userInput }, { role: 'api', text: responseText }]);
    setUserInput(''); // Clear the input field
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.role}>
            <strong>{msg.role === 'user' ? 'You' : 'API'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatComponent;
