import ttt from './ttt.jpeg'

function NavBar() {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <a class="navbar-brand" href="pass">
                <img src={ttt} alt="TTT" width="75" height="75"/>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="pass">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="pass">Contact Us</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href='/LogIn'>Log in</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>

    )
}

export default NavBar;