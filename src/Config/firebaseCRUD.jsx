import { useContext, useEffect, useState } from "react";
import { useFirebase } from "./firebase";
import { getDatabase } from 'firebase/database';
import { serverTimestamp,getFirestore, 
  onSnapshot,updateDoc,
  where,query, orderBy,count,sum,
  collection, doc, addDoc,getDoc, getDocs,setDoc } from 'firebase/firestore';
import {getStorage,ref,uploadBytes,getDownloadURL}  from "firebase/storage"; 
import { useNavigate } from "react-router-dom";

const useFirebaseCRUD = () => {
  const nav = useNavigate();
    const { firebaseApp } = useFirebase();
    const {UID} = useFirebase();
    const db = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);
  const [userData,setUserData] = useState([]);
    // useData
    const addUserData = async (data,proof,latitud,longitud) => {
      try {
        // upload image
        const storageRef = ref(storage, `proofs/${proof.name}-${Date.now()}`);
        await uploadBytes(storageRef, proof);
        const downloadURL = await getDownloadURL(storageRef);
        const userData = { ...data, proof: downloadURL,latitude:latitud,longitude:longitud, };
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
                data = { ...data, orgProof: downloadURL,createdAt:serverTimestamp() };
            }
    
            const docRef = await addDoc(collection(db,`Org_DATA`), data);
            alert("Thankyou");
            nav('/home');
            return docRef.id;
        } catch (error) {
            console.error('Error adding document:', error);
        }
    };
    
    //Request and donatios Data
    const addReqDonat = async (collectionName,data) => {
        try {
          const newData = {
            ...data,
            createdAt: serverTimestamp(),
          };
            const docRef = await addDoc(collection(db,`${collectionName}`), newData);
            alert("THANkYOU, we'll get back to you!");
            nav("/home");
            return docRef.id;
        } catch (error) {
          alert("error in adding document",error);
            console.error('Error adding document:', error);
        }
    };
    
    const getUserDetails = async (UID) => {
      try {
        const userQuery = query(collection(db, 'USER_DATA'), where('uid', '==', UID));
        const userQuerySnapshot = await getDocs(userQuery);
        
        if (!userQuerySnapshot.empty) {
          const userDetails = userQuerySnapshot.docs[0].data()
           setUserData(userDetails);
          console.log(userData);
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
    // Get user data based on UID
    useEffect ( () => {

      const getUserData = async () => {
        try {
          const userQuery = query(collection(db, 'USER_DATA'), where('uid', '==', UID));
          const userQuerySnapshot = await getDocs(userQuery);
          
          if (!userQuerySnapshot.empty) {
            const userDetails = userQuerySnapshot.docs[0].data()
             setUserData(userDetails);
            console.log(userData);
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
      getUserData();
    }, [UID, ]);

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
const getDonatData = async () => {
  try {
    // console.log(uid);
    const queryRef = collection(db,'DONATs');
    const DonatQuery = query(queryRef, where('donorID', '==', UID));
    const  querySnapshot = await getDocs(DonatQuery);

    console.log(querySnapshot.docs);
    const donationData = [];
    querySnapshot.forEach((doc) => {
      donationData.push({ id: doc.id, ...doc.data() });
    });
    console.log(donationData,"y");
    return donationData;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};
//requests
const getReqsData = async (uid) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'REQs'), where('recipientID', '==', uid));
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
const getNotifications = async (uid) =>{
  // console.log("in gett notif")
  const notificationsRef = collection(db, 'NOTIFICATIONS');
  const notificationsQuery = query(notificationsRef, where('userId', '==', uid));
  const notificationsSnapshot = await getDocs(notificationsQuery);

  const notifications = [];
  notificationsSnapshot.forEach((doc) => {
    notifications.push({ id: doc.id, ...doc.data() });
  });
  for (const notification of notifications) {
    const docRef = doc(db, 'NOTIFICATIONS', notification.id);
    await updateDoc(docRef, { status: 1 });
  };
  return notifications;
};

const PostNotifications = async ( userId, donationId, requestId, message) => {
  console.log("in post notif")
    try {
        const notificationRef = await addDoc(collection(db, 'NOTIFICATIONS'), {
            userId,
            donationId,
            requestId,
            message,
            timestamp: serverTimestamp(),
            status:0,
        });
        console.log("Notification created with ID: ", notificationRef.id);
    } catch (error) {
        console.error("Error creating notification: ", error);
    }
};

//combinatioi notfification
const createCombinationApprovalNotification = async (userId, requesterUserId, donationId, requestId, message) => {
  try {
      const notificationRef = await addDoc(collection(db, 'NOTIFICATIONS'), {
          type: "combination_approval",
          userId,
          requesterUserId,
          donationId,
          requestId,
          message,
          timestamp: serverTimestamp(),
      });
      console.log("Notification created with ID: ", notificationRef.id);
  } catch (error) {
      console.error("Error creating notification: ", error);
  }
};


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

  const userSubcollectionRef = query(collection(db, `USER_DATA`),orderBy('adminVerifyDetails'));
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
  const donationsSnapshot = await getDocs(query(collection(db, 'DONATs'),orderBy('dateDonating','desc')));
  const donationsWithUserData = [];
  const donationUserData = [];

  for (const doc of donationsSnapshot.docs) {
    const donationData = doc.data();
    const donorId = donationData.donorID;
    const uid = donorId;
    const userQuerySnapshot = await getDocs(query(collection(db, `USER_DATA`),where('uid', '==', donorId)));
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
  const reqsSnapshot = await getDocs(query(collection(db, 'REQs'),orderBy('dateDonating','desc')));
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

const fetchAllDonations = async (statusFilter, verificationFilter) => {
  const donationsRef = query(collection(db, 'DONATs'));
  let filteredDonationsQuery = donationsRef;

  if (statusFilter) {
    filteredDonationsQuery = query(filteredDonationsQuery,orderBy('dateDonating'), where('status', '==', statusFilter));
  }

  if (verificationFilter) {
    filteredDonationsQuery = query(filteredDonationsQuery, where('adminVerify', '==', verificationFilter));
  }

  const donationsSnapshot = await getDocs(filteredDonationsQuery);
  const donations = donationsSnapshot.docs.map(doc => doc.data());

  return donations;
};

const groupDonations = async () => {
  const donations = await fetchDonations();
  const groupedByDonorId = orderBy(donations, 'donorId');
  const donorIdCounts = {};
  for (const donorId in groupedByDonorId) {
    donorIdCounts[donorId] = groupedByDonorId[donorId].length;
  }

  const groupedByDistrict = orderBy(donations, 'District');
  const districtCounts = {};
  for (const district in groupedByDistrict) {
    districtCounts[district] = groupedByDistrict[district].length;
  }

  return { donorIdCounts, districtCounts };
};


const getGroupByDonorId = async () => {
  const donationsRef = collection(db, 'DONATs');
  const donationsSnapshot = await getDocs(donationsRef);
  const donationsData = [];

  donationsSnapshot.forEach((doc) => {
    const donation = doc.data();
    const existingDonation = donationsData.find((d) => d.donorID === donation.donorID);
    const querySnapshot = getDocs(collection(db, 'USER_DATA'), where('uid', '==', donation.donorID));
    const userData = [];
    querySnapshot.docs().forEach((doc) => {
      userData.push({ donorName: doc.fullName });
    });
    if (existingDonation) {
      existingDonation.count++;
    } else {

      donationsData.push({ donorId: donation.donorID, count: 1 });
    }
  });

  return donationsData;
};

const getGroupByDistrict = async () => {
  const donationsRef = collection(db, 'DONATs');
  const donationsSnapshot = await getDocs(donationsRef);
  const donationsData = [];
  console.log(donationsSnapshot);

  donationsSnapshot.forEach((doc) => {
    const donation = doc.data();
    const existingDistrict = donationsData.find((d) => d.district === donation.district);
    
    if (existingDistrict) {
      existingDistrict.count++;
      console.log(existingDistrict);
    } else {
      donationsData.push({ district: donation.district, count: 1 });
      console.log(donationsData);
    }
  });

  return donationsData;
};



// possuble matches
const fetchPossibleMatches = async () => {
  const donationsRef = query(collection(db, 'DONATs'),orderBy('dateDonating',"desc"));
  const reqsRef = collection(db, 'REQs');
  const usersRef = collection(db, 'USER_DATA');

  const [donationsSnapshot, reqsSnapshot, usersSnapshot] = await Promise.all([
    getDocs(donationsRef),
    getDocs(reqsRef),
    getDocs(usersRef)
  ]);
  const userData = [];
  usersSnapshot.forEach((userDoc) => {
    userData.push({ uid: userDoc.id, ...userDoc.data() });
  });

  //fetch matccting donation and request
  const possibleMatches = [];

  donationsSnapshot.forEach((donationDoc) => {
    reqsSnapshot.forEach((reqDoc) => {
      const donationQty = donationDoc.data().qtyDonating;
      const reqQty = reqDoc.data().requiredQty;
      const donationDistrict = donationDoc.data().district;
      const reqDistrict = reqDoc.data().district;
      const qtyDifference = Math.abs(donationQty - reqQty);

      // Match the district and check the quantity difference
      if (donationDistrict === reqDistrict && (qtyDifference === 0 || qtyDifference <= 5)) {
        // Get the user data for both donor and recipient
        const donorId = donationDoc.data().donorID;
        const recipientId = reqDoc.data().recipientID;
// console.log(reqDoc.id)
        // Fetch user data for the donor and recipient
        const donorData = userData.find(user => user.uid === donorId);
        const recipientData = userData.find(user => user.uid === recipientId);

        possibleMatches.push({
          donationId: donationDoc.id,
          donationData: { ...donationDoc.data(),...donorData },
          requestId: reqDoc.id,
          requestData: { ...reqDoc.data(), ...recipientData }
        });
      }
    });
  });

  return possibleMatches;
};


//store the possible matches
const storeMatch = async (donationId, requestId, qtyDonated, date,district, status) => {
  try {
    const donationRef = doc(db, "DONATs", donationId);
    await updateDoc(donationRef, { status: 1 });

    const requestRef = doc(db, "REQs", requestId);
    await updateDoc(requestRef, { status: 1 });
    const docRef = await addDoc(collection(db, 'COMBINED'), {
      donationId: donationId,
      requestId: requestId,
      qtyDonated: qtyDonated,
      dateDonating: date,
      districtDonated:district,
      status: status,
      createdAT: serverTimestamp(),
    });
    console.log('Match added with ID: ', docRef.id);
    alert("Document Added");
  } catch (error) {
    console.error('Error adding match: ', error);
  }
};

//notify to to donor and recipient
const storeNotification = async (userId, message) => {
  try {
    const docRef = await addDoc(collection(db, 'NOTIFICATIONS'), {
      userId: userId,
      message: message,
      timestamp: serverTimestamp(),
    });
    console.log('Notification added with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding notification: ', error);
  }
};


//total counts donat and reqs
const getDonationsReport = async () => {
  const donationsRef = collection(db, 'DONATs');
  const donationsSnapshot = await getDocs(donationsRef);
  const donationsData = donationsSnapshot.docs.map(doc => doc.data());
// console.log(donationsData);
  const totalDonations = donationsData.length;

  const today = new Date();
  const donatStartOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const nextday = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);
  console.log(nextday,"net")
  const donatStartOfThisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
  const donatStartOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
// donationsData.filter(donation => console.log(donation.dateDonating,"date"));
  // const donationsMadeDaily = donationsData.filter(donation =>  Date(donation.dateDonating) >= startOfToday ).length;
  const donationsMadeDaily = donationsData.filter(donation => {
    const donationDate = new Date(donation.dateDonating);
    return donationDate >= donatStartOfToday && donationDate < nextday;
  }).length;
  const donationsMadeWeekly = donationsData.filter(donation => new Date(donation.dateDonating) >= donatStartOfThisWeek).length;
  const donationsMadeMonthly = donationsData.filter(donation => new Date(donation.dateDonating) >= donatStartOfThisMonth).length;

  const approvedDonations = donationsData.filter(donation => donation.adminVerify === true).length;
  const rejectedDonations = donationsData.filter(donation => donation.adminVerify === false).length;



  //REQs Colectsion
  const reqsRef = collection(db, 'REQs');
  const reqsSnapshot = await getDocs(reqsRef);
  const reqsData = reqsSnapshot.docs.map(doc => doc.data());
// console.log(reqsData);
  const totalReqs = reqsData.length;

  const reqStartOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const reqStartOfThisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
  const reqStartOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
// reqsData.filter(req => console.log(req.dateDonating,"date"));
  // const reqsMadeDaily = reqsData.filter(req =>  Date(req.dateDonating) >= startOfToday ).length;
  const reqsMadeDaily = reqsData.filter(req => {
    const reqDate = new Date(req.dateDonating);
    return reqDate >= reqStartOfToday && reqDate < nextday;
  }).length;
  const reqsMadeWeekly = reqsData.filter(req => new Date(req.dateDonating) >= reqStartOfThisWeek).length;
  const reqsMadeMonthly = reqsData.filter(req => new Date(req.dateDonating) >= reqStartOfThisMonth).length;

  const approvedReqs = reqsData.filter(req => req.adminVerify === true).length;
  const rejectedReqs = reqsData.filter(req => req.adminVerify === false).length;
  const ratioMonthly = donationsMadeMonthly/reqsMadeMonthly;
 
  return { totalDonations,donationsMadeDaily,donationsMadeWeekly, donationsMadeMonthly,approvedDonations,rejectedDonations,
    totalReqs,reqsMadeDaily,reqsMadeWeekly, reqsMadeMonthly,approvedReqs,rejectedReqs , ratioMonthly };
};
//total users
const getTotalUsers = async () => {
    const usersSnapshot = await getDocs(collection(db, 'USERS'));
    // console.log(usersSnapshot,'snao')
    const totalDonors = usersSnapshot.docs.filter(doc => doc.data().role === '1').length;
    const totalApproved = usersSnapshot.docs.filter(doc => doc.data().adminApprove===true).length;
    const totalRejected = usersSnapshot.docs.filter(doc => doc.data().adminApprove===false).length;
    const totalApprovedDonors = usersSnapshot.docs.filter(doc => doc.data().adminApprove===true && doc.data().role==='1').length;
    const totalRejectedDonors = usersSnapshot.docs.filter(doc => doc.data().adminApprove===false && doc.data().role==='1').length;
    const totalRecipients = usersSnapshot.docs.filter(doc => doc.data().role==='2').length;
    const totalApprovedRecipients = usersSnapshot.docs.filter(doc => doc.data().adminApprove===true && doc.data().role==='2').length;
    const totalRejectedRecipients = usersSnapshot.docs.filter(doc => doc.data().adminApprove===false && doc.data().role==='2').length;
    const totalUsers =usersSnapshot.size;
    const ratio = totalRecipients / totalDonors;
    console.log(totalUsers);
    return {totalUsers, totalApproved, totalRejected, totalDonors, totalApprovedDonors, totalRejectedDonors, totalRecipients, totalApprovedRecipients, totalRejectedRecipients,  ratio};
 
};



///dummy
const listenTotalUsers = (callback) => {
  const usersRef = collection(db, 'USERS');
  const unsubscribe = onSnapshot(usersRef, (snapshot) => {
    const totalDonors = snapshot.docs.filter(doc => doc.data().role === '1').length;
    const totalApproved = snapshot.docs.filter(doc => doc.data().adminApprove === true).length;
    const totalRejected = snapshot.docs.filter(doc => doc.data().adminApprove === false).length;
    const totalApprovedDonors = snapshot.docs.filter(doc => doc.data().adminApprove === true && doc.data().role === '1').length;
    const totalRejectedDonors = snapshot.docs.filter(doc => doc.data().adminApprove === false && doc.data().role === '1').length;
    const totalRecipients = snapshot.docs.filter(doc => doc.data().role === '2').length;
    const totalApprovedRecipients = snapshot.docs.filter(doc => doc.data().adminApprove === true && doc.data().role === '2').length;
    const totalRejectedRecipients = snapshot.docs.filter(doc => doc.data().adminApprove === false && doc.data().role === '2').length;
    const totalUsers = snapshot.size;
    const ratio = totalRecipients / totalDonors;

    const userData = {totalUsers, totalApproved, totalRejected, totalDonors, totalApprovedDonors, totalRejectedDonors, totalRecipients, totalApprovedRecipients, totalRejectedRecipients, ratio };

    callback(userData);
  });
console.log(userData);
  return unsubscribe;
};




  
    return {  userData,addUserData, addOrgData, addReqDonat, 
      getOrgUserData,getUserDetails,
      getReqsData, getDonatData, 
      getNotifications, PostNotifications,createCombinationApprovalNotification,
      fetchDonations,fetchRequests,fetchUsers,fetchUserDetails,
      fetchPossibleMatches,
      fetchAllDonations,groupDonations,getGroupByDonorId,getGroupByDistrict,
      getDonationsReport,getTotalUsers,
      listenTotalUsers,
      storeMatch,storeNotification,
      getDataById, getAllData };
      
  };
  
  export default useFirebaseCRUD;
   
  
 
  
  
  