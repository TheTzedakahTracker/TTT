import React from "react";
import LogoImg from './LogoImg';

function LINavBar() {
    return (<>
        <ul>
            <li><a href='/'><LogoImg width='75px' height='75px'/></a></li>
            <li><a className="active navWord" href="/">Home</a></li>
            <li><a className='navWord' href="/mainmember">My Profile</a></li>
            <li><a className='navWord' href="/contact">Contact</a></li>
        </ul>
</> )
}

export default LINavBar;