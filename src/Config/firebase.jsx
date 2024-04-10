import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
      updateProfile, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { createContext, useContext, useEffect, useState } from 'react';
import { getFirestore, collection, doc, addDoc,getDoc, getDocs,setDoc } from 'firebase/firestore';
import {getStorage,ref,uploadBytes,getDownloadURL}  from "firebase/storage"; 

import { useNavigate } from "react-router-dom";

const FirebaseContext = createContext(null);
const firebaseConfig = {
    apiKey: "AIzaSyCoLFu2d76SwSNWCAqb8-RQyCMADnBUwO0",
    authDomain: "resqfood-c3120.firebaseapp.com",
    projectId: "resqfood-c3120",
    storageBucket: "resqfood-c3120.appspot.com",
    messagingSenderId: "658515381984",
    appId: "1:658515381984:web:cae0ee7065057c68a0ca85"
  };

  
export const useFirebase = () => useContext(FirebaseContext);

export const fireapp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(fireapp);
const database = getDatabase(fireapp);
const storage = getStorage(fireapp);
export const firestore = getFirestore(fireapp);

const db = getFirestore(fireapp);
export const FirebaseProvider = (props) => {

  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [userRole,setUserRole] =useState(null);
  const [UID, setUID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
      if(user){
      setUID(user.uid);
        const userRef = doc(db, 'USERS', user.uid);
        getDoc(userRef).then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserRole(userData.role); 
          
            console.log('User role:', userData.role);
          } else {
            console.log('User data not found');
          }
        }).catch((error) => {
          console.error('Error getting user data:', error);
        });
      }
      console.log("user -- ", user?.email); 
      setIsLoading(false);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  
    return () => unsubscribe();
  }, [firebaseAuth, db]);
     
  
  const signUp = async (email, pwd,role,approved) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, pwd);
      const newUser = userCredential.user;
      // Add user to collection
      const userRef = doc(db, 'USERS', newUser.uid);
      await setDoc(userRef, {
        email: newUser.email,
        role:role,
        adminApprove:approved,
        // status:'waiting',
        uid: newUser.uid,
      });
      console.log('User signed up and logged in:', newUser.uid);
      nav('/user/signup/initialForm');
    } catch (error) {
      console.error('Error signing up:', error.code, error.message);
      alert('Error signing up: ' + error);
    }
  };
  



  const signInUser = (email, pwd) => {

    try{
      signInWithEmailAndPassword(firebaseAuth, email, pwd)
      .then((userCredential) => { 
        const logUser = userCredential.user;
        if(userRole === 'ADMIN'){
          nav('/user/role/adminDash');
        }
        else{
          nav('/home'); 
        }
       })
      .catch((error) => { 
        const errorCode = error.code; 
        const errorMessage = error.message; 
      });
    console.log('logged')
    }
    catch(Error)
    {
      alert("Error found ",Error);
      throw Error;
    }
  };

  const updateUserInfo =(userRole) =>{
    updateProfile(firebaseAuth.currentUser, {
      displayName: userRole,
    }).then(() => {
      console.log('disname',currentUser.displayName);
    }).catch((error) => {
      alert("Error in profile",error);
    });
  };
  
    const SignOut = () => {
    signOut(firebaseAuth);
    setUser(null);
    localStorage.removeItem('user'); 
  };


  const uploadImage = async (file, title) => {
    const storageRef = ref(storage, `product_images/${title}-${Date.now()}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };


return (
  <FirebaseContext.Provider value={{ user,UID,userRole, signUp,  signInUser,updateUserInfo, SignOut,uploadImage }}>
  {!isLoading ? (
    props.children
  ) : (
    <div>Loading...</div>
  )}
</FirebaseContext.Provider>
);
};
