import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD_-WuAKVEiAAYWONuF1MEruIw-osVidVY",
    authDomain: "react-cms-58a3a.firebaseapp.com",
    databaseURL: "https://react-cms-58a3a.firebaseio.com",
    projectId: "react-cms-58a3a",
    storageBucket: "react-cms-58a3a.appspot.com",
    messagingSenderId: "241240657859"
};
firebase.initializeApp(config);

export default firebase;