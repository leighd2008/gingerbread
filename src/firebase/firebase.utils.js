import firebase from 'firebase/app';
import "firebase/firestore";
import 'firebase/storage';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyB24eb-gAnaeGrBnC_0569bzGfHTUo2_DY",
  authDomain: "gingerbread-e53ae.firebaseapp.com",
  databaseURL: "https://gingerbread-e53ae.firebaseio.com",
  projectId: "gingerbread-e53ae",
  storageBucket: "gingerbread-e53ae.appspot.com",
  messagingSenderId: "680123585360",
  appId: "1:680123585360:web:ce5e6c97364ee887675255",
  measurementId: "G-B25VBZKHNL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const convertCollectionsSnapshotToMap = pictures => {
  const transformedCollection = pictures.docs.map(doc => {
    const {
      category,
      images,
    } = doc.data();

    return {
      routeName: encodeURI(category),
      id: doc.id,
      category,
      images,
    };
  });

  return transformedCollection.reduce((accumulator, picture) => {
    accumulator[picture.category] = picture;
    return accumulator;
  }, {});
};

export const storage = firebase.storage();
export const firestore = firebase.firestore();
export const database = firebase.database();


export default firebase;