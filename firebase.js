import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC2RAI-aQP3Cyojlif3zcoc8ZpZ_iwdaKA",
    authDomain: "clone-f7226.firebaseapp.com",
    projectId: "clone-f7226",
    storageBucket: "clone-f7226.appspot.com",
    messagingSenderId: "904096549668",
    appId: "1:904096549668:web:615f2a946d61e037e481b1"
};

// const app = firebase.initializeApp(firebaseConfig);
const app = !firebase.app.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();

export default db;