import { useNavigate } from 'react-router';
import './SignUp.css'
import { useState } from 'react';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [aiAccepted, setAiAccepted] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();

        const response = await fetch('#', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password, address, city, state, zip, aiAccepted }),
        });

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
                <div class="row mb-3">
                    <label htmlFor="inputAddress" class="col-sm-2 col-form-label">Address:</label>
                    <div class="col-md-6">
                        <input
                            type="text"
                            class="form-control"
                            id="inputAddress"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required/>
                    </div>
                </div>
                <div class="row mb-3">
                    <label htmlFor="inputCity" class="col-sm-2 col-form-label">City:</label>
                    <div class= "col-md-4">
                        <input
                            type="text"
                            class="form-control"
                            id="inputCity"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required/>
                    </div>
                </div>
                <div class="row mb-3">
                    <label htmlFor="inputState" class="col-sm-2 col-form-label">State:</label>
                    <div class="col-md-3">
                        <input
                            type="text"
                            class="form-control"
                            id="inputState"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required />
                    </div>
                </div>
                <div class="row mb-3">
                    <label htmlFor="inputZip" class="col-sm-2 col-form-label">Zip:</label>
                    <div class="col-md-2">
                        <input
                            type="text"
                            class="form-control"
                            id="inputZip"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
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