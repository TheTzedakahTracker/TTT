import React from 'react';
import '../styling/ChatComponent.css'; // Make sure to include appropriate styles for the popup
import tttLogo from '../../../src/tttLogo.png';

const FormPopup = ({
  isOpen,
  onClose,
  togglePopup,
  toggleMinimize,
  userInput,
  setUserInput,
  handleSubmit,
  messages,
  isMinimized, // Ensure this is passed from the parent component
  minimizedIcon // Ensure this is passed from the parent component
}) => {
  if (!isOpen) return null; // Return null if the popup is not open

  return (
    
    <div className={`popup-overlay ${isMinimized ? 'minimized' : ''}`}>

      {!isMinimized ? (
      <div className="popup-container">
        {/* <button className="popup-toggle-btn" onClick={togglePopup}>
          {isOpen ? '-' : '+'}
        </button> */}
        {/* <button className="close-btn" onClick={toggleMinimize}>-</button> */}
        <div className="popup-messages">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
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
            ))
          ) : (
            <div>No messages yet.</div>
          )}
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
      ) : (
        <img src={minimizedIcon || tttLogo} alt="Chat Icon" className="minimized-icon" onClick={toggleMinimize} />
      )}
    </div>
  );
};

export default FormPopup;
