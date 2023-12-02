//Registration.js

import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const isPasswordValid = password === confirmPassword;

  const handleRegistration = async () => {
    if (!isPasswordValid) {
      setError('The confirm password does not match the password.');
      return;
    }
  
    try {
      // Create a user account in Firebase
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      
      // Get the Firebase user object
      const user = userCredential.user;

      // Save user information to Firestore
      await firebase.firestore().collection('users').doc(user.uid).set({
        firstName,
        lastName,
        email,
        phoneNumber,
      });

      // Redirect the user to the main page of the app
      window.location.href = '/';
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };
  
  return (
    <div className="registration">
      <h2>Registration</h2>
      {error && <div className="error-message">{error}</div>}
      
      <input
        className="LandGInput"
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        className="LandGInput"
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        className="LandGInput"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="LandGInput"
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        className="LandGInput"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="LandGInput"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="LandGInput" onClick={handleRegistration}>
        Register
      </button>
    </div>
  );
};

export default Registration;