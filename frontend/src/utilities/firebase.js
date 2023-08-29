import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set, push, remove } from 'firebase/database';
import {getStorage, listAll, ref as sRef, getDownloadURL} from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDatabaseValue } from "@react-query-firebase/database";
import { useState,useEffect } from 'react';



const firebaseConfig = {
    apiKey: "AIzaSyB9CxFVb8iKl04zDNPtngcmd4ygvok4YG8",
    authDomain: "turbomath-a0c94.firebaseapp.com",
    databaseURL: "https://turbomath-a0c94-default-rtdb.firebaseio.com",
    projectId: "turbomath-a0c94",
    storageBucket: "turbomath-a0c94.appspot.com",
    messagingSenderId: "287662292669",
    appId: "1:287662292669:web:0ae78b89346f9d59b941d4",
    measurementId: "G-HGSPEXVBLN"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const storage = getStorage(firebase);



export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
  };

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useUserState = () => useAuthState(getAuth(firebase));

// read data
export const useData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
  
    useEffect(() => (
        onValue(ref(database, path), (snapshot) =>{
            setData(snapshot.val());
        }
      , (error) => {
        setError(error);
      })
    ), [ path ]);
  
    return [ data, error ];
  };


// Set Data
export const setData = (path, value) =>{
    set(ref(database, path), value)
} 

//removeData
export const removeData = (path) =>{
    remove(ref(database, path));
}

//use images
export const useImages = (path) =>{
  const [imageLists, setImageLists] = useState([]);
  useEffect(()=>{
    listAll(sRef(storage, path)).then((res)=>{
        res.items.forEach(x => {
          getDownloadURL(x).then(url =>{
            setImageLists((prev) => [...imageLists, url]);
          })
        })
    })
  }, [path])

  return imageLists;
};

