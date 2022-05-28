// // import firebase from "firebase/app"
// // import "firebase/storage"
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyDrXmeVCb65FyUs4cRGlpbf__MXMfNDC74",
//     authDomain: "tshirt-203f9.firebaseapp.com",
//     projectId: "tshirt-203f9",
//     storageBucket: "tshirt-203f9.appspot.com",
//     messagingSenderId: "761580352629",
//     appId: "1:761580352629:web:5479375b69dc19cd44743c",
//     measurementId: "G-J1SM8YX8NP"
//   };


//   const firebaseApp = initializeApp(firebaseConfig);

//   const storage = getStorage(firebaseApp);

//   export {storage as default}

import firebase from "firebase/app"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDrXmeVCb65FyUs4cRGlpbf__MXMfNDC74",
    authDomain: "tshirt-203f9.firebaseapp.com",
    projectId: "tshirt-203f9",
    storageBucket: "tshirt-203f9.appspot.com",
    messagingSenderId: "761580352629",
    appId: "1:761580352629:web:5479375b69dc19cd44743c",
    measurementId: "G-J1SM8YX8NP"
  };


  firebase.initializeApp(firebaseConfig)

  const storage=firebase.storage();

  export {storage,firebase as default}