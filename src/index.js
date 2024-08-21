import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));//Uses ReactDOM.createRoot to create a root to render the application into. This is part of Concurrent Mode in React.
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <App/>
=======
    <NavBar />
    <App />
>>>>>>> 841a8f6613e08f2342faadfaf6354f5a019c962d
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
