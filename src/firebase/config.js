import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"


const firebaseConfig = {
    apiKey: "AIzaSyBB03rKgtu1zscQy0_xSFv2hm_WQn8Pp64",
    authDomain: "hilal-id.firebaseapp.com",
    projectId: "hilal-id",
    storageBucket: "hilal-id.appspot.com",
    messagingSenderId: "742513447872",
    appId: "1:742513447872:web:c8b66b1c5d069f0a47ae25"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()
const timestamp = firebase.firestore.FieldValue.serverTimestamp
export { projectAuth, projectFirestore, timestamp, projectStorage }