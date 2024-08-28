import React, { useState, useEffect } from 'react';

export default function MyProfile(props) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {

        const response = await fetch(`http://localhost:5000/get_a_user/${props.id}`);
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

  return (
    <div>
      {userInfo ? (
        <div>
          <p>User ID: {userInfo.userid}</p>
          <p>First Name: {userInfo.firstname}</p>
          <p>Last Name: {userInfo.lastname}</p>
          <p>Email: {userInfo.emailAdd}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

