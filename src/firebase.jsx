const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/storage');


const config = {
    apiKey: "AIzaSyD_-WuAKVEiAAYWONuF1MEruIw-osVidVY",
    authDomain: "react-cms-58a3a.firebaseapp.com",
    databaseURL: "https://react-cms-58a3a.firebaseio.com",
    projectId: "react-cms-58a3a",
    storageBucket: "react-cms-58a3a.appspot.com",
    messagingSenderId: "241240657859"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
}
firestore.settings(settings);

const carsData = firestore.collection('data-objects').doc('cars');

const storage = firebase.storage();
const images = storage.ref('images');

export {images, firestore, carsData};
