// https://exerror.com/solved-export-default-imported-as-firebase-was-not-found-in-firebase-app/#:~:text='firebase%2Fapp'-,To%20Solve%20export%20'default'%20(imported%20as%20'firebase'),compat%E2%80%9D%20version%20of%20each%20import.
// import firebase from "firebase/app";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
// export default initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);
export const authService = firebase.auth();