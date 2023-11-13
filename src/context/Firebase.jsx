import { useContext } from "react";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getStorage, getDownloadURL, ref } from "firebase/storage";

const FirebaseContext = createContext(null);
const firebaseConfig = {
  apiKey: "AIzaSyCTtFR2l7D_r2jx6X47U5V9MBLeL0x5zjU",
  authDomain: "d-portfolio-9e021.firebaseapp.com",
  projectId: "d-portfolio-9e021",
  storageBucket: "d-portfolio-9e021.appspot.com",
  messagingSenderId: "707186107011",
  appId: "1:707186107011:web:772d9d2a296391e8ccf1b6",
};

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const listAllData = () => {
    return getDocs(collection(firestore, "data"));
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  return (
    <FirebaseContext.Provider value={{ listAllData, getImageURL }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
