import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBr_PMX78xhjsCO0Fv6clCE6oOO-YOgFXY",
  authDomain: "interview-4d3a6.firebaseapp.com",
  databaseURL: "https://interview-4d3a6.firebaseio.com",
  projectId: "interview-4d3a6",
  storageBucket: "interview-4d3a6.appspot.com",
  messagingSenderId: "135627815679",
  appId: "1:135627815679:web:7d3d9469fbd0d86d0deaca",
  measurementId: "G-D1LVXP0640"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
// firebase.analytics();

export const auth = firebase.auth
export default firebase;

