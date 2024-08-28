import React, { useState } from 'react';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/api/customers/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message);  // Handle login success (e.g., redirect)
        } else {
            const errorData = await response.json();
            setErrorMsg(errorData.error);
            setSuccessMsg('');
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/api/customers/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone, password }),
        });

        if (response.ok) {
            const data = await response.json();
            setSuccessMsg(data.message);
            setErrorMsg('');
        } else {
            const errorData = await response.json();
            setErrorMsg(errorData.error);
            setSuccessMsg('');
        }
    };

    return (
        <div className="container">
            <form onSubmit={isLogin ? handleLogin : handleRegister} className="mt-4">
                {!isLogin && (
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={!isLogin}
                        />
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone (optional)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                {successMsg && <div className="alert alert-success">{successMsg}</div>}
                <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <div className="mt-3">
                <small>
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
                        {isLogin ? 'Register here' : 'Login here'}
                    </button>
                </small>
            </div>
        </div>
    );
};

export default Auth;