import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD1fR-fEj_u73X6BbXqWlWyg3saVx-daGk",
    authDomain: "clothing-store-3619d.firebaseapp.com",
    projectId: "clothing-store-3619d",
    storageBucket: "clothing-store-3619d.appspot.com",
    messagingSenderId: "19280467244",
    appId: "1:19280467244:web:64dce1107c5f86614ec889",
    measurementId: "G-WEKLT8PKZJ"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef=firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName, 
          email,
          createdAt,
          ...additionalData
        })
      } catch (err) {
        console.log("Error creating user", err.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider)


  export default firebase;
