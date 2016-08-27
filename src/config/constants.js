import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCCSogp6VWQ_AsZ_yWgM5Ky4Um2FCmI9to",
  authDomain: "utage-7e146.firebaseapp.com",
  databaseURL: "https://utage-7e146.firebaseio.com",
  storageBucket: "utage-7e146.appspot.com",
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
