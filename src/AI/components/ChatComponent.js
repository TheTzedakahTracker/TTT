//store conversation
//brooklyn vs brooklyn ny
//florida
//new york


import React, { useState } from 'react';
import { queryModel } from '../services/geminiService';
import { searchGCSE } from '../services/gcseService';
import '../styling/ChatComponent.css';
import ResponseCard from './ResponseCard';

// const SearchPopup = ({ onClose, searchResults }) => (
//   <div className="popup-container">
//     <div className="popup-content">
//       <button className="close-btn" onClick={onClose}>Close</button>
//       <div className="search-results">
//         {searchResults.map((result, index) => (
//           <div key={index} className="result-card">
//             <a href={result.link} target="_blank" rel="noopener noreferrer">
//               <h3>{result.title}</h3>
//               <p>{result.snippet}</p>
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [context, setContext] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessages = [...messages, { role: 'user', text: userInput }];
    setMessages(newMessages);
    const newContext = [...context, { role: 'user', text: userInput }];
    setContext(newContext);
    try {
      const geminiResponse = await queryModel(userInput, newContext);
      console.log('Gemini Response:', geminiResponse);

      

      if (geminiResponse.requiresSearch) {
        const searchQuery = geminiResponse.searchQuery;
        console.log('Search Query:', searchQuery);
        
        const searchResults = await searchGCSE(searchQuery);
        console.log('Search Results:', searchResults);

        

        const formattedResponse = searchResults.length
          ? searchResults.map(item => `${item.title} - ${item.snippet}\n${item.link}`).join('\n\n')
          : 'No results found.';
          console.log('Formatted Response:', formattedResponse);

          const finalResponse = await queryModel(
            `Search within the orthodox jewish world based on the following paramaters: respect for the fact that this community is very sensitive to their own culture and needs. Please keep all results kosher and within the paramaters of jewish law. And the results shouldn't include an intro to the results being displayed, but rather have displayed the results only with the organization name, link to the organization and description of the organization. If the user asks any questions unrelated to organizations, handle their questions gracefully but respond that its not what our chatbot is about: ${formattedResponse}`, 
            newContext
        );
        console.log('Final Gemini Response:', finalResponse);
        
          
        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'api', text: finalResponse.text  }
        ]);
  
        setContext(prevContext => [
          ...prevContext,
          { role: 'api', text: finalResponse.text }
        ]);
      } else {
        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'api', text: geminiResponse.text }
        ]);
  
        setContext(prevContext => [
          ...prevContext,
          { role: 'api', text: geminiResponse.text }
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'api', text: 'Error processing your request' }
      ]);
    }

    setUserInput('');
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            if (msg.type === 'searchResults') {
              return msg.data.map((item, idx) => (
                <ResponseCard
                  key={`${index}-${idx}`}
                  title={item.title}
                  snippet={item.snippet}
                  link={item.link}
                />
              ));
              
            } else {
            return (
              <div
                dangerouslySetInnerHTML={{ 
                  __html: `<strong>${msg.role === 'user' ? 'You' : 'API'}:</strong> ${
                    typeof msg.text === 'string' 
                    ? msg.text.replace(/\n/g, '<br/>')
                    : ''
                  }`
                }}
              />
            )
              }
          })
        ) : (
              <div className="no-messages">No messages yet.</div>
            )
        }
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
        />
        
        <button type="submit" disabled={!userInput.trim()} className="chat-submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
