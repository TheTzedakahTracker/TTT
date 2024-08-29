import React from 'react';
import ResponseCard from './ResponseCard';

const TestResponseCard = () => {
  const sampleData = [
    { title: 'Title 1', snippet: 'Snippet 1', link: 'https://example.com/1' },
    { title: 'Title 2', snippet: 'Snippet 2', link: 'https://example.com/2' }
  ];

  return (
    <div>
      {sampleData.map((item, index) => (
        <ResponseCard
          key={index}
          title={item.title}
          snippet={item.snippet}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default TestResponseCard;
