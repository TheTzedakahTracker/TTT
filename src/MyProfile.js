import React, { useState, useEffect } from 'react';
import Buttonbar from './Buttonbar';
import MakeDonation from './MakeDonation';
import './MemberMain.css';

export default function MyProfile(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [showDonate, setShowDonate] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {

        const response = await fetch(`http://localhost:5000/get_profile/${props.id}`);
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (e) {
        console.error('Error:', e);
      }
    };

    getUserInfo();
  }, []); // Empty dependency array means this effect runs once when the component mounts
  
  const toggleDonateComponent = () => {
    setShowDonate(!showDonate);
  };

  return (
    <div>
      {userInfo ? (
        <>
        <div className="container">
        <div className="row">
          <div className="myinfo col-2">
            {/* <p>{userInfo.userid}</p> */}
            <p><span className="blacktext">Member Name: </span>{userInfo.firstname} {userInfo.lastname}</p>
            <p><span className="blacktext">Available Funds:</span> ${userInfo.availablefunds.toFixed(2)}</p>
          </div>

          <div className="col-12 text-center margin-top-large">
          <div>
            <button onClick={toggleDonateComponent} style={{ backgroundColor: '#444E8A', color: 'white', padding: '10px 20px', margin: '7rem', border: 'none', borderRadius: '5rem' }}>Record a Donation</button>
            <button style={{ backgroundColor: '#444E8A', color: 'white', padding: '10px 20px', margin: '7rem', border: 'none', borderRadius: '5rem' }}>Get Donation History</button>
          </div>
          </div>
        </div>
        </div>
        <div>
        {showDonate && <MakeDonation id={props.id} />}
        </div>
        </>

      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

