import React, { useEffect, useState } from 'react';
import { account } from '../config/Appwrite';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Account = () => {
  const [userinfo, setUserinfo] = useState();
  const navigate = useNavigate(); // Initialize useNavigate

  // APPWRITE CONFIGURATION
  useEffect(() => {
    const userData = account.get();
    userData.then(
      function (response) {
        setUserinfo(response);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await account.deleteSession('current');  // This deletes the current session
      navigate('/login'); // Redirect to the login page after logout
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  // Redirect to ChangePassword component
  const redirectToChangePassword = () => {
    navigate('/change-password'); // This will navigate to the '/change-password' route
  };

  return (
    <>
      <div>Account</div>
      {userinfo ? (
        <>
          <div>
            <i>Name: {userinfo.name}</i>
            <br />
            <i>Email: {userinfo.email}</i>
          </div>
          {/* Button to redirect to the ChangePassword component */}
          <div>
            <button onClick={redirectToChangePassword}>Change Password</button>
          </div>
          {/* Logout Button */}
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        </>
      ) : (
        <i>User info loading...</i>
      )}
    </>
  );
};

export default Account;
