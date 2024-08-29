import { useNavigate } from 'react-router';
import './SignUp.css'
import { useState } from 'react';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [aiAccepted, setAiAccepted] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:5000/add_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password, aiAccepted }),
        });
console.log(JSON.stringify({ firstName, lastName, email, password, aiAccepted }))
        if (response.ok) {
            const data = await response.json();
            setSuccessMsg(data.message); 
            setErrorMsg('');
            setTimeout(() => {
                navigate('/login'); 
            }, 2000); 
        } else {
            const errorData = await response.json();
            setErrorMsg(errorData.error);
            setSuccessMsg('');
        }
    };


    return (<>
        <div className='signUpBox'>
        <h3>SIGN UP:</h3>
            <form onSubmit={handleSignUp}>
            <div class="row mb-3">
                    <label htmlFor="inputFirstName" class="col-sm-2 col-form-label">First Name:</label>
                    <div class= "col-md-4">
                        <input
                            type="text"
                            class="form-control"
                            id="inputFirstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required/>
                    </div>
                </div>
                <div class="row mb-3">
                    <label htmlFor="inputLastName" class="col-sm-2 col-form-label">Last Name:</label>
                    <div class= "col-md-4">
                        <input
                            type="text"
                            class="form-control"
                            id="inputLastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required/>
                    </div>
                </div>
                <div class="row mb-3">
                    <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">Email:</label>
                    <div class="col-md-8">
                        <input
                            type="email"
                            class="form-control"
                            id="inputEmail3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                    </div>
                </div>
                <div class="row mb-3">
                    <label htmlFor="inputPassword3" class="col-sm-2 col-form-label">Password:</label>
                    <div class="col-md-4">
                        <input
                            type="password"
                            class="form-control"
                            id="inputPassword3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required/>
                    </div>
                </div>
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="gridCheck1"
                        checked={aiAccepted}
                        onChange={(e) => setAiAccepted(e.target.checked)}/>
                    <label class="form-check-label" htmlFor="gridCheck1">
                    Would you like to enable AI features for your personal Tzedakah Tracker profile?
                    </label>
                </div><br />
                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                {successMsg && <div className="alert alert-success">{successMsg}</div>}
                <button type="submit" class="btn btn-outline-dark btn-sm rounded-pill">SIGN UP</button>
            </form><br/>
        </div>
      </>  )
}
export default SignUp;