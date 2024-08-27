import React from 'react';
import '../styling/ResponseCard.css';

const ResponseCard = ({ title, snippet, link }) => {
  return (
    <div className="response-card" onClick={() => window.open(link, '_blank')}>
      <h3 className="response-title">{title}</h3>
      <p className="response-snippet">{snippet}</p>
    </div>
  );
};

export default ResponseCard;
