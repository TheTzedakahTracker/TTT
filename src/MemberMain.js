import MakeDonation from './MakeDonation';
import LogoImg from './LogoImg';
import './MemberMain.css';
import { useState } from 'react';



function MemberMain(){

    return(
        <>
            <div>
                <h4>First Last</h4>
            </div>

            <div>
                <p>Donated this year:</p>
                <p>Funds available for Donating:</p>
            </div>

            <div>
                <button onClick={handleClick}>New Donation</button>
            </div>
          <div>{showDonation && <MakeDonation />}</div>
        </>
    );

}
export default MemberMain;