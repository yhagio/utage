import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDGzFseEXo83K92yGY9GosAvmRga83GFDU',
  authDomain: 'utage-7e146.firebaseapp.com',
  databaseURL: 'https://utage-7e146.firebaseio.com',
  storageBucket: 'utage-7e146.appspot.com'
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
