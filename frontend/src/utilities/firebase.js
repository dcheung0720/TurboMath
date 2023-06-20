import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDatabaseValue } from "@react-query-firebase/database";

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



export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
  };

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useUserState = () => useAuthState(getAuth(firebase));

// read data
export const useData = (path, transform) => {
    const { data, isLoading, error } = useDatabaseValue(path, ref(database, path), { subscribe: true });
    const value = (!isLoading && !error && transform) ? transform(data) : data;
  
    return [ value, isLoading, error ];
  };


// Store Data
export const setData = (path, value) =>{
    set(ref(database, path), value)
} 