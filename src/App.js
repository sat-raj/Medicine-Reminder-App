//app.js
import React, { useState, useEffect } from 'react';
import './App.css';
import ReminderList from './components/ReminderList';
import ReminderForm from './components/ReminderForm';
import Registration from './components/Registration';
import Login from './components/Login';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function App() {
  const [firstName, setFirstName] = useState('');
  const [reminders, setReminders] = useState([]);
  const [user, setUser] = useState(null);


  
  useEffect(() => {
    // Get the logged-in user's first name
    const user = firebase.auth().currentUser;
  
    if (user) {
      setFirstName(user.first_name);
    }
  }, [firebase.auth().currentUser]);

  
  // Load reminders from localStorage on app start
  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    setReminders(savedReminders);

    // Add a Firebase listener to check the user's authentication state
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleAddReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  const handleDeleteReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
  };

  const handleSignOut = () => {
    // Sign out the user
    firebase.auth().signOut();
  };

  return (
    <div className="App fade-in">
      <h1>MediCare</h1>
      <div className="app-content">
        {user ? (
          <>
            <button onClick={handleSignOut}>Sign Out</button>
            <ReminderForm onAdd={handleAddReminder} />
            <ReminderList reminders={reminders} onDelete={handleDeleteReminder} />
          </>
        ) : (
          <>
            <div className='LandG'>
              <Registration /> {/* Display registration component */}
              <Login /> {/* Display login component */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;