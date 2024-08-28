import './HomePage.css'

function HomePage({ user, handleLogout }) {
    return(
        <body>
            <div className="jumbotron hbox">
            <h1 className="display-4 welcome">Welcome to The Tzedakah Tracker.</h1>
            <p className="lead">You know those little notes you leave for yourself all around?</p>
            <p className="lead">You owe this much, you gave this much...</p>
            <p className="lead">Not anymore.</p>
            <p className="lead">The Tzedakah Tracker is a simple, efficient way to keep track of all your Tzedakah related transactions.</p>
            <hr className="my-4"/>
            {user ? (
                    <><p>Click below to log out:</p>
                    <a className="btn btn-outline-dark btn-sm rounded-pill" role="button" onClick={handleLogout}>LOG OUT</a></>
                ) : (
                    <><p>Click below to log in:</p>
                    <a className="btn btn-outline-dark btn-sm rounded-pill" href="/login" role="button">LOG IN</a></>
                )}
            </div>
    </body>)
}

export default HomePage;