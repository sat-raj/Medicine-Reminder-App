//index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

firebase.initializeApp( {
  apiKey: "AIzaSyAahofeqd34LHtc_6o0KVqkgWqp1t_scGE",
  authDomain: "medicine-50756.firebaseapp.com",
  projectId: "medicine-50756",
  storageBucket: "medicine-50756.appspot.com",
  messagingSenderId: "240779650533",
  appId: "1:240779650533:web:2e34bfaa91f5ba7636fb0c",
  measurementId: "G-KTLMT6W71P"
});

const messaging = firebase.messaging();
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals



reportWebVitals();
