import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: "AIzaSyCeRUoOFtkbkILshGTIWgd2wu0sk7B1oc4",
    authDomain: "social-ebe71.firebaseapp.com",
    projectId: "social-ebe71",
    storageBucket: "social-ebe71.appspot.com",
    messagingSenderId: "749007342611",
    appId: "1:749007342611:web:568d961ec3436a98e403e6"
  };
firebase.initializeApp(firebaseConfig)

export default firebase;