import LogoImg from './LogoImg';
import './NavBar.css'
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ user, name, handleLogout }) {
  
    return (<>
            
      {user ? (<>
        
          <ul>
            {/* <li><a href='/'><LogoImg width='75px' height='75px' /></a></li> */}
            <li><Link to={{pathname: '/',state: { id: user }}}><LogoImg width='75px' height='75px' /></Link></li>
                <li><Link to={{pathname: '/',state: { id: user }}} className='active navWord'>Home</Link></li>
                <li><Link to={{pathname: '/membermain',state: { id: user }}} className='navWord'>My Profile</Link></li>
                <li><Link to={{pathname: '/contact',state: { id: user }}} className='navWord'>Contact</Link></li>
                <li>
                  {/* <span>Hello, {user}</span> */}
                  <button className='navWord' onClick={handleLogout}>Logout</button>
                </li></ul>
              </>
            ) : (<><ul><li><a href='/'><LogoImg width='75px' height='75px'/></a></li>
            <li><a className="active navWord" href="/">Home</a></li>
                    <li><a className='navWord' href="/login">Log In</a></li>
                    <li><a className='navWord' href="/contact">Contact</a></li></ul>
                </>
            )}
                
            
</> );
}

    

export default NavBar;