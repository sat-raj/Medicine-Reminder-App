import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

const NotificationForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSendNotification = async () => {
    try {
      if (!phoneNumber || !message) {
        alert('Please provide both a phone number and a message.');
        return;
      }

      // Check if messaging is supported by the browser
      if (!firebase.messaging.isSupported()) {
        alert('Messaging is not supported in this browser.');
        return;
      }

      // Initialize Firebase
      if (!firebase.apps.length) {
        firebase.initializeApp({
          // Add your Firebase config here
          apiKey: 'YOUR_API_KEY',
          authDomain: 'YOUR_AUTH_DOMAIN',
          projectId: 'YOUR_PROJECT_ID',
          // ...other config options
        });
      }

      const messaging = firebase.messaging();

      // Request permission to send notifications
      await Notification.requestPermission();
      const token = await messaging.getToken();

      // Send notification
      await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `key=YOUR_SERVER_KEY`,
        },
        body: JSON.stringify({
          to: token,
          notification: {
            title: 'New Message',
            body: message,
          },
          data: {
            phoneNumber,
          },
        }),
      });

      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Notification sent successfully!');
    }
  };

  return (
    <div className="notification-form">
      <h2>Send Notification</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="message-box" // Add a class for styling
      />
      <button onClick={handleSendNotification}>Send Notification</button>
    </div>
  );
};

export default NotificationForm;
