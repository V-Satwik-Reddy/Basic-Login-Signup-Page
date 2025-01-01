import React, { useState } from 'react';
import { account } from '../config/Appwrite';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const passwordRequirements = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase || !hasLowerCase) {
      return "Password must contain both uppercase and lowercase letters.";
    }
    if (!hasDigits) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }

    return ""; // If all checks pass, return an empty string
  };

  const changePassword = async () => {
    const errorMessage = passwordRequirements(newPassword);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    try {
      // Check if user is logged in
      const session = await account.get();
      if (!session) {
        alert("You must be logged in to change the password.");
        return;
      }

      // Update password
      await account.updatePassword(newPassword, oldPassword);
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      if (error.message.includes("Invalid credentials")) {
        alert("Old password is incorrect.");
      } else {
        alert("Failed to update password. Please try again.");
      }
    }
  };

  return (
    <div>
      <h3>Change Password</h3>
      <input
        type="password"
        placeholder="Old Password"
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={changePassword}>Update Password</button>
    </div>
  );
};

export default ChangePassword;
