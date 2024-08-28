import LogoImg from './LogoImg';
import MyProfile from './MyProfile'
import MakeDonation from './MakeDonation'
import './MemberMain.css';
import { useState } from 'react';



function MemberMain(){
console.log('in function');
    return(
        <>
            <div>
                <h4>First Last</h4>
            </div>

            <div>
                <p>Donated this year:</p>
                <p>Funds available for Donating:</p>
            </div>
        </div>
        
        <div className="container-fluid">
            <div className="row">
                <div className='col-6'>
                    <MakeDonation/>
                </div>
            </div>
          <div>{showDonation && <MakeDonation />}</div>
        </>
    );

}
export default MemberMain;