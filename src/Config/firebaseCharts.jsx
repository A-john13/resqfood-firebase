import { useContext, useEffect, useState } from "react";
import { useFirebase } from "./firebase";
import { getDatabase } from 'firebase/database';
import { serverTimestamp,getFirestore, onSnapshot,updateDoc, where,query, orderBy,
     count,sum,collection, doc, addDoc,getDoc, getDocs,setDoc } from 'firebase/firestore';
import {getStorage,ref,uploadBytes,getDownloadURL}  from "firebase/storage"; 
import { useNavigate } from "react-router-dom";

const useFirebaseChart = () => {
  const nav = useNavigate();
    const { firebaseApp } = useFirebase();
    const {UID} = useFirebase();
    const db = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);





    return {   };
        
    };
    
    export default useFirebaseChart;