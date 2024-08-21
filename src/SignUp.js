function SignUp() {
    return (<>
    <form>
    <div class="row mb-3">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail3"/>
        </div>
    </div>
    <div class="row mb-3">
        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword3"/>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-sm-10 offset-sm-2">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck1"/>
                <label class="form-check-label" for="gridCheck1">
                Would you like to enable AI features for your personal Tzedakah Tracker?
                </label>
            </div>
        </div>
    </div>
    <button type="submit" class="btn btn-primary">Sign Up</button>
</form>
   </> )
}
export default SignUp;