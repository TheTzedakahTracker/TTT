import { useNavigate } from 'react-router';
import './LogIn.css';
import React, { useState } from 'react';



function LogIn({setUser, setName}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const backendUrl = 'http://localhost:5000/login';
    
        try {
          const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
          if (response.ok) {
            const data = await response.json();
            setUser(data.id);
            setName(data.name);

            window.sessionStorage.setItem("isLoggedIn", "True");
            navigate('/')
          } else {
            window.sessionStorage.setItem("isLoggedIn", "False");
            setMessage('Your login was not successful. Please try again.');
          }
        } catch (error) {
          console.error('Error logging in:', error);
          setMessage('An error occurred. Please try again.');
        }
      };

    return (<>
        <div className='logInBox'>
        <h3>LOG IN:</h3>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email:</label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password:</label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required/>
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-dark btn-sm rounded-pill">LOG IN</button>
            </form><br />
            {message && <p>{message}</p>}
            <p>If you are not a TTT user, please sign up <a href='/signup'>here</a>.</p>
        </div>
    </>)
    
    
}

export default LogIn;