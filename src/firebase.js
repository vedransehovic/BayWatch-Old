import firebase from "firebase";
//import 'firebase/analytics';

const config_live = {
  apiKey: "AIzaSyB4heeT6uq_kxW1PFiwmDv4n_3lrcgj_vk",
  authDomain: "baywatch-development.firebaseapp.com",
  databaseURL: "https://baywatch-development-default-rtdb.firebaseio.com",
  projectId: "baywatch-development",
  storageBucket: "baywatch-development.appspot.com",
  messagingSenderId: "1092065407332",
  appId: "1:1092065407332:web:cb82ff923dd6310de74a71",
  measurementId: "G-DCEVQ1ZYS3",
};

const config_staging = {
  apiKey: "AIzaSyB4heeT6uq_kxW1PFiwmDv4n_3lrcgj_vk",
  authDomain: "baywatch-development.firebaseapp.com",
  databaseURL: "https://baywatch-development-default-rtdb.firebaseio.com",
  projectId: "baywatch-development",
  storageBucket: "baywatch-development.appspot.com",
  messagingSenderId: "1092065407332",
  appId: "1:1092065407332:web:cb82ff923dd6310de74a71",
  measurementId: "G-DCEVQ1ZYS3",
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
