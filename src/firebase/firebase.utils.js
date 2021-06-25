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

  export const createUserProfileDocument = async (userAuth) => { 
    if (!userAuth) return;

    const userRef=firestore.doc(`users/${userAuth.uid}`);
 

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email} = userAuth;  
      const createdAt = new Date();
      
      try {
        await userRef.set({
          displayName,         
          email,
          createdAt
        })
      } catch (err) {
        console.log("Error creating user", err.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef= collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();
  }

  export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
    const transformedCollection = collectionsSnapshot.docs.map(
      docSnapshot => {
        const {title, items} = docSnapshot.data();

        return {
          routeName: encodeURI(title.toLowerCase()),
          id: docSnapshot.id,
          title,
          items
        }
      }
    )
    //convert each object to a new one ie, hats= hats collection, jackets = jackets collection, the title is the key
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {})
  }

  export const getCurrentUser = () => {
    return new Promise( (resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject)
    })
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)


  export default firebase;
