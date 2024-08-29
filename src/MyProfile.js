import React, { useState, useEffect } from 'react';
import CreateOrganization from './CreateOrganization';
import MakeDonation from './MakeDonation';
import AddFunds from './AddFunds';
import './MemberMain.css';

export default function MyProfile(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [showDonate, setShowDonate] = useState(false);
  const [showOrganizations, setShowOrganizations] = useState(false);
  const [showFunds, setShowFunds] = useState(false);
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
    setShowOrganizations(false);
    setShowFunds(false);
    setShowDonate(!showDonate);
    
  };
  const toggleOrganizationComponent = () => {
    setShowDonate(false);
    setShowFunds(false);
    setShowOrganizations(!showOrganizations);
  };
  
  const toggleFundsComponent = () => {
    setShowDonate(false);
    setShowOrganizations(false)
    setShowFunds(!showFunds);
  };

  return (
    <div>
      {userInfo ? (
        <>
        <div className="container">
        <div className="row">
          <div className="myinfo col-3">
            {/* <p>{userInfo.userid}</p> */}
            <p><span className="blacktext">Member Name: </span>{userInfo.firstname} {userInfo.lastname}</p>
            <p><span className="blacktext">Available Funds:</span> ${userInfo.availablefunds.toFixed(2)}</p>
          </div>

          <div className="container text-center margin-top-large">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-2">
            <button onClick={toggleDonateComponent} style={{ backgroundColor: '#444E8A', color: 'white', padding: '10px 20px', margin: '1rem', border: 'none', borderRadius: '5rem' }}>Record a Donation</button>
            </div>
            <div className="col-2">
            <button onClick={toggleFundsComponent} style={{ backgroundColor: '#444E8A', color: 'white', padding: '10px 20px', margin: '1rem', border: 'none', borderRadius: '5rem' }}>Add Funds</button>
            </div>
            <div className="col-2">
            <button onClick={toggleOrganizationComponent} style={{ backgroundColor: '#444E8A', color: 'white', padding: '10px 20px', margin: '1rem', border: 'none', borderRadius: '5rem' }}>Add a New Organization</button>
            </div>
            <div className="col-2">
            <button style={{ backgroundColor: '#444E8A', color: 'white', padding: '10px 20px', margin: '1rem', border: 'none', borderRadius: '5rem' }}>Donation History</button>
            </div>
            <div className="col-2"></div>
          </div>
          </div>
        </div>
        </div>
        <div>
        {showDonate && <MakeDonation id={props.id} />}
        {showOrganizations && <CreateOrganization id={props.id} />}
        {showFunds && <AddFunds id={props.id} />}
        </div>
        </>

      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

