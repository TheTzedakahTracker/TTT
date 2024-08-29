//store conversation
//brooklyn vs brooklyn ny
//florida
//new york


import React, { useState, useEffect } from 'react';
import { queryModel } from '../services/geminiService';
import { searchGCSE } from '../services/gcseService';
import '../styling/ChatComponent.css';
import ResponseCard from './ResponseCard';
import FormPopup from './FormPopup';
import tttLogo from '../../../src/tttLogo.png';


const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [context, setContext] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // New state for expansion

  useEffect(() => {
    // Automatically expand if the number of messages exceeds a threshold
    const messageCount = messages.length;
    if (messageCount > 5) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [messages]);

  useEffect(() => {
    // Manage the popup transition based on isPopupOpen
    const handlePopupTransition = () => {
      const overlay = document.querySelector('.popup-overlay');
      if (isPopupOpen) {
        overlay.classList.add('open');
      } else {
        overlay.classList.remove('open');
      }
    };

    handlePopupTransition();
  }, [isPopupOpen]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessages = [...messages, { role: 'user', text: userInput }];
    setMessages(newMessages);
    const newContext = [...context, { role: 'user', text: userInput }];
    setContext(newContext);
    setIsPopupOpen(true);
    setIsMinimized(false);
    

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
        // = searchResults.length
        //   ? searchResults.map(item => `${item.title} - ${item.snippet}\n${item.link}`).join('\n\n')
        //   : 'No results found.';
          console.log('Formatted Response:', formattedResponse);

          const finalResponse = await queryModel(
            `Search within the orthodox jewish world based on the following paramaters: respect for the fact that this community is very sensitive to their own culture and needs. Please keep all results kosher and within the paramaters of jewish law. And the results shouldn't include an intro to the results being displayed, but rather have displayed the results only with the organization title as title, description as snippet and link to the organization as link. If the user asks any questions unrelated to organizations, handle their questions gracefully but respond that its not what our chatbot is about: ${formattedResponse}`, 
            newContext
        );
        console.log('Final Gemini Response:', finalResponse);
        
          
        setMessages(prevMessages => [
          ...prevMessages,
         { role: 'api', text: finalResponse.text }
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

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };



  return (
    <div className="chat-component">
    
      
    <div className={`minimized-icon-container ${isPopupOpen ? '' : 'minimized'}`} onClick={togglePopup}>
      <img
        src={tttLogo}
        alt="Chat Icon"
        className="minimized-icon"
      />
    </div>
    {!isMinimized && (
    <div className={`popup-overlay ${isPopupOpen ? 'open' : 'minimized'}`}>
    <div className="popup-container">
      {/* <button onClick={openPopup} className="open-popup-btn">Open Search</button> */}
      {/* <button onClick={togglePopup} className="close-btn">
        {isPopupOpen ? '-' : '+'}
      </button> */}
      <FormPopup
        isOpen={isPopupOpen}
        // onClose={() => setIsPopupOpen(false)}
        isMinimized={isMinimized}
        togglePopup={togglePopup}
        toggleMinimize={toggleMinimize}
        userInput={userInput}
        setUserInput={setUserInput}
        handleSubmit={handleSubmit}
        messages={messages}
        minimizedIcon={tttLogo}
      />
            <div className={`popup-messages ${isExpanded ? 'expanded' : ''}`}>
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
              key={index}
              className={`message ${msg.role}`}
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

      <form onSubmit={handleSubmit} className="popup-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
          className="chat-input"
        />
        
        <button type="submit" disabled={!userInput.trim()} className="chat-submit">
          Send
        </button>
      </form>
    </div>
    </div>
  )}
</div>
  );
}


export default ChatComponent;
