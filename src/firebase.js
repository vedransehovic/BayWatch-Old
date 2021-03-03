import firebase from 'firebase';
//import 'firebase/analytics';


const config_live = {
  apiKey: "AIzaSyDAooRf0gULIOoHy4zaxReSfD6UWynnHMI",
  authDomain: "abelcine-baywatch.firebaseapp.com",
  databaseURL: "https://abelcine-baywatch.firebaseio.com",
  projectId: "abelcine-baywatch",
  storageBucket: "abelcine-baywatch.appspot.com",
  messagingSenderId: "957294772080",
  appId: "1:957294772080:web:10478c86ab4bb2925259b5",
  measurementId: "G-RPNTVGL9FV"
};

const config_staging = {
  apiKey: "AIzaSyDAooRf0gULIOoHy4zaxReSfD6UWynnHMI",
  authDomain: "abelcine-baywatch.firebaseapp.com",
  databaseURL: "https://abelcine-baywatch.firebaseio.com",
  projectId: "abelcine-baywatch",
  storageBucket: "abelcine-baywatch.appspot.com",
  messagingSenderId: "957294772080",
  appId: "1:957294772080:web:c6b8e8c6dd573b1f5259b5",
  measurementId: "G-MLBV6S7SX8"
};

// DISABLED 08/05/20 - AT - Old config
/*
const config = {
    // Initialize Firebase
    apiKey: "AIzaSyB-Zi2_qNBOuW9kDfM2IFACsUIO7G3jjzU",
    authDomain: "myfirebase-25061.firebaseapp.com",
    databaseURL: "https://myfirebase-25061.firebaseio.com",
    projectId: "myfirebase-25061",
    storageBucket: "myfirebase-25061.appspot.com",
    messagingSenderId: "841536767506"
};
*/

var node_env = process.env.NODE_ENV;

/*
if(node_env == "live"){
	//firebase.initializeApp(config_live);
}else{
	//firebase.initializeApp(config_staging);
}
*/
firebase.initializeApp(config_staging);

//firebase.analytics();
export default firebase;