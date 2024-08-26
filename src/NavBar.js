import LogoImg from './LogoImg';
import './NavBar.css'
import React from 'react';

function NavBar() {

    return (<>
            <ul>
                <li><a href='/'><LogoImg width='75px' height='75px'/></a></li>
                <li><a className="active navWord" href="/">Home</a></li>
                <li><a className='navWord' href="/login">Log In</a></li>
                <li><a className='navWord' href="/contact">Contact</a></li>
            </ul>
</> );
}

    

export default NavBar;