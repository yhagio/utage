import { ref, firebaseAuth } from '../config/constants';

export default function auth () {
  return firebaseAuth().signInWithPopup(new firebase.auth.FacebookAuthProvider());
}

export function checkIfAuthed (store) {
  return store.getState().users.get('isAuthenticated') === true;
}

export function signout () {
  return firebaseAuth().signOut();
}

// Save user info in Firebase
export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user);
}
