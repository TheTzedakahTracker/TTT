import './LogIn.css';
import React from 'react';



function LogIn() {

    return (<>
        <div className='logInBox'>
        <h3>LOG IN:</h3>
            <form>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email:</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputEmail3"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password:</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword3"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-dark btn-sm rounded-pill">LOG IN</button>
            </form><br/>
            <p>If you are not a TTT user, please sign up <a href='/signup'>here</a>.</p>
        </div>
      </>  )
}

export default LogIn;