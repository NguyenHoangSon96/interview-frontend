import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCYjWZcakvKgLDVqMQ10MHySrDBoFpD218",
  authDomain: "linhtinh0.firebaseapp.com",
  databaseURL: "https://linhtinh0.firebaseio.com",
  projectId: "linhtinh0",
  storageBucket: "linhtinh0.appspot.com",
  messagingSenderId: "429447923690",
  appId: "1:429447923690:web:c147bd86889150d5199493",
  measurementId: "G-4GK5B4F5LT"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
// firebase.analytics();

export const auth = firebase.auth
export default firebase;

