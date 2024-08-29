import React from 'react';
import ChatComponent from './ChatComponent';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <main>{children}</main>
      <ChatComponent />
    </div>
  );
};

export default Layout;
