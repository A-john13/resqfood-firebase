import { useContext, useState } from "react";
import { useFirebase } from "./firebase";
import { getDatabase } from 'firebase/database';
import { serverTimestamp,where,query,getFirestore, 
  onSnapshot,updateDoc,
  collection, doc, addDoc,getDoc, getDocs,setDoc } from 'firebase/firestore';
import {getStorage,ref,uploadBytes,getDownloadURL}  from "firebase/storage"; 
import { useNavigate } from "react-router-dom";

const useFirebaseCRUD = () => {
  const nav = useNavigate();
    const { firebaseApp } = useFirebase();
    const {UID} = useFirebase();
    const db = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);
  
    // useData
    const addUserData = async (data,proof) => {
      try {
        // upload image
        const storageRef = ref(storage, `proofs/${proof.name}-${Date.now()}`);
        await uploadBytes(storageRef, proof);
        const downloadURL = await getDownloadURL(storageRef);
        const userData = { ...data, proof: downloadURL };
        await setDoc(doc(db, 'USERS', UID), { name: data.firstName }, { merge: true });
        const docRef = await addDoc(collection(db, `USER_DATA`), userData);
        return docRef.id;
      } catch (error) {
        console.error('Error adding document:', error);
      }
    };
   

    //orgData
    const addOrgData = async (data,OrgProof) => {
        try {
            if (OrgProof) {
              console.log("if");
                const storageRef = ref(storage, `proofs/${OrgProof.name}-${Date.now()}`);
                await uploadBytes(storageRef, data.orgProof);
                const downloadURL = await getDownloadURL(storageRef);
                data = { ...data, orgProof: downloadURL };
            }
    
            const docRef = await addDoc(collection(db,`Org_DATA`), data);
            alert("Thankyou for your valuable donation, we'll notify you soon");
            nav('/home');
            return docRef.id;
        } catch (error) {
            console.error('Error adding document:', error);
        }
    };
    
    //Request and donatios Data
    const addReqDonat = async (collectionName,data) => {
        try {
            const docRef = await addDoc(collection(db,`${collectionName}`), data);
            alert("THANkYOU, we'll get back to you!");
            nav("/home");
            return docRef.id;
        } catch (error) {
          alert("error in adding document",error);
            console.error('Error adding document:', error);
        }
    };
    
    // Get user data based on UID
    const getUserData = async (UID) => {
      try {
        const userQuery = query(collection(db, 'USER_DATA'), where('uid', '==', UID));
        const userQuerySnapshot = await getDocs(userQuery);
    
        if (!userQuerySnapshot.empty) {
          const userData = userQuerySnapshot.docs[0].data();
          return userData;
        } else {
          console.log('User data not found');
          return null;
        }
      } catch (error) {
        console.error('Error getting user data:', error);
        return null;
      }
    };
//get org - realted user
const getOrgUserData = async (UID) => {
  try {
    const userOrgQuery = query(collection(db, 'Org_DATA'), where('representID', '==', UID));
    const userOrgQuerySnapshot = await getDocs(userOrgQuery);

    if (!userOrgQuerySnapshot.empty) {
      const userOrgData = userOrgQuerySnapshot.docs[0].data();
      return userOrgData;
    } else {
      console.log('User-Org data not found');
      return null;
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

//donation
const getDonatData = async (uid) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'DONATs'), where('donorId', '==', uid));
    const userData = [];
    querySnapshot.forEach((doc) => {
      userData.push({ id: doc.id, ...doc.data() });
    });
    return userData;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};
//requests
const getReqsData = async (uid) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'REQs'), where('recipientId', '==', uid));
    const userData = [];
    querySnapshot.forEach((doc) => {
      userData.push({ id: doc.id, ...doc.data() });
    });
    return userData;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};
  
//notifications
const getNotifications =()=>{
  console.log("in gett notif")
  // try{
  //   console.log("in get notif")

  // }
  // catch(error){
  //   console.log(error,"error in notify");
  // }
}
const PostNotifications =()=> {
  console.log("in post notif")
  // try{

   
  // }
  // catch(error){
  //   console.log("error in sending notifications");
  // }
}


    const getDataById = async (collectionName, id) => {
      try {
        const docSnap = await getDoc(query(collection(db, collectionName), where('uid', '==', id)));
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };
  
    const getAllData = async (collectionName) => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        return data;
      } catch (error) {
        console.error('Error getting documents:', error);
      }
    };

   
// for admin
const fetchUserDetails = async (setUserDatas) => {
  const userDetails = [];

  const userSubcollectionRef = collection(db, `USER_DATA`);
  const unsubscribe = onSnapshot(userSubcollectionRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        userDetails.push({ ...change.doc.data(), id: change.doc.id });
      }
      if (change.type === "modified") {
        const index = userDetails.findIndex((user) => user.id === change.doc.id);
        if (index !== -1) {
          userDetails[index] = { ...change.doc.data(), id: change.doc.id };
        }
      }
      if (change.type === "removed") {
        const index = userDetails.findIndex((user) => user.id === change.doc.id);
        if (index !== -1) {
          userDetails.splice(index, 1);
        }
      }
    });
    setUserDatas(userDetails);
  });
  return unsubscribe;
};


 const fetchDonations = async () => {
  const donationsSnapshot = await getDocs(collection(db, 'DONATs'));
  const donationsWithUserData = [];
  const donationUserData = [];

  for (const doc of donationsSnapshot.docs) {
    const donationData = doc.data();
    const donorId = donationData.donorID;
    const uid = donorId;
    const userQuerySnapshot = await getDocs(query(collection(db, `USER_DATA`), where('uid', '==', donorId)));
    let userData = null;

    userQuerySnapshot.forEach((userDoc) => {
      userData = userDoc.data();
      donationUserData.push({...userDoc});
    });

    donationsWithUserData.push({ id: doc.id, ...donationData,...userData });
  }
  return [donationsWithUserData,donationUserData];
};

// Function to fetch requests
 const fetchRequests = async () => {
  const reqsSnapshot = await getDocs(collection(db, 'REQs'));
  const reqsWithUserData = [];
  const reqsUserData =[];

  for (const doc of reqsSnapshot.docs) {
    const reqData = doc.data();
    const userQuerySnapshot = await getDocs(query(collection(db, 'USER_DATA'), where('uid', '==', reqData.recipientID)));
    let userData = null;

    userQuerySnapshot.forEach((userDoc) => {
      userData = userDoc.data();
      reqsUserData.push({...userDoc});
    });

    reqsWithUserData.push({ id: doc.id, ...reqData, ...userData });

  }
  
  return [reqsWithUserData,reqsUserData];
 };


 const createCombination =()=>{
  console.log("in gett createcombinations")
 
}
 const fetchCombination =()=>{
  console.log("in gett createcombinations")
 
}
 const updateCombination =()=>{
  console.log("in gett createcombinations")
 
}
// Function to fetch users
const fetchUsers = async () => {
  const [data,setData] = useState([]);
  const usersRef = collection(db, "USER_DATA");
  
  const unsubscribe = onSnapshot(usersRef, (snapshot) => {
    const usersData = [];
    snapshot.forEach((doc) => {
      usersData.push({ id: doc.id, ...doc.data() });
    });
    setData(usersData);
    console.log("crud users", )
  });
 
  return unsubscribe;
};


//reports

const fetchAllDonations = async()=>{
  const donatsSnapshot = await getDocs(collection(db, 'DONATs'));
  const donatsData = donatsSnapshot.docs.map(doc => doc.data());
  return donatsData;
};

const fetchAllReqs = async()=> {
  const reqsSnapshot = await getDocs(collection(db, 'REQs'));
  const reqsData = reqsSnapshot.docs.map(doc => doc.data());
  return reqsData;
};



    
  
    return { addUserData, addOrgData, addReqDonat, 
      getUserData,getOrgUserData,
      getReqsData, getDonatData, 
      getNotifications, PostNotifications,
      fetchDonations,fetchRequests,fetchUsers,fetchUserDetails,
      fetchAllDonations,fetchAllReqs,
      createCombination,fetchCombination,updateCombination,
      getDataById, getAllData };
      
  };
  
  export default useFirebaseCRUD;
   
  
 
  
  
  