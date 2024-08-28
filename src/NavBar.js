import LogoImg from './LogoImg';
import './NavBar.css'
import React from 'react';

function NavBar({ user, handleLogout }) {
  
    return (<>
            <ul>
                <li><a href='/'><LogoImg width='75px' height='75px'/></a></li>
            <li><a className="active navWord" href="/">Home</a></li>
            {user ? (
                <>
                <li><a className='navWord' href="/membermain">My Profile</a></li>
                <li><a className='navWord' href="/contact">Contact</a></li>
                <li>
                  <span>Hello, {user.name}</span>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (<>
                    <li><a className='navWord' href="/login">Log In</a></li>
                    <li><a className='navWord' href="/contact">Contact</a></li>
                </>
            )}
                
            </ul>
</> );
}

    

export default NavBar;