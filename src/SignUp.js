import './SignUp.css'

function SignUp() {
    return (<>
        <div className='signUpBox'>
        <h3>SIGN UP:</h3>
            <form>
            <div class="row mb-3">
                    <label htmlFor="inputFirstName" class="col-sm-2 col-form-label">First Name:</label>
                    <div class= "col-md-4">
                        <input type="text" class="form-control" id="inputFirstName" />
                    </div>
                </div>
                <div class="row mb-3">
                    <label htmlFor="inputLastName" class="col-sm-2 col-form-label">Last Name:</label>
                    <div class= "col-md-4">
                        <input type="text" class="form-control" id="inputLastName" />
                    </div>
                </div>
                <div class="row mb-3">
                    <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">Email:</label>
                    <div class="col-md-8">
                        <input type="email" class="form-control" id="inputEmail3"/>
                    </div>
                </div>
                <div class="row mb-3">
                    <label htmlFor="inputPassword3" class="col-sm-2 col-form-label">Password:</label>
                    <div class="col-md-4">
                        <input type="password" class="form-control" id="inputPassword3"/>
                    </div>
                </div>
                <div class="row mb-3">
                    <label htmlFor="inputAddress" class="col-sm-2 col-form-label">Address:</label>
                    <div class="col-md-6">
                        <input type="text" class="form-control" id="inputAddress"/>
                    </div>
                </div>
                <div class="row mb-3">
                    <label htmlFor="inputCity" class="col-sm-2 col-form-label">City:</label>
                    <div class= "col-md-4">
                        <input type="text" class="form-control" id="inputCity" />
                    </div>
                </div>
                <div class="row mb-3">
                    <label htmlFor="inputState" class="col-sm-2 col-form-label">State:</label>
                    <div class="col-md-3">
                        <input type="text" class="form-control" id="inputState" />
                    </div>
                </div>
                <div class="row mb-3">
                    <label htmlFor="inputZip" class="col-sm-2 col-form-label">Zip:</label>
                    <div class="col-md-2">
                        <input type="text" class="form-control" id="inputZip" />
                    </div>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck1"/>
                    <label class="form-check-label" htmlFor="gridCheck1">
                    Would you like to enable AI features for your personal Tzedakah Tracker profile?
                    </label>
                </div><br/>
                <button type="submit" class="btn btn-outline-dark btn-sm rounded-pill">SIGN UP</button>
            </form><br/>
        </div>
      </>  )
}
export default SignUp;