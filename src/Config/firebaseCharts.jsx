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


//Donations
    const listenDonationsReport = (callback) => {
      const donationsRef = collection(db, 'DONATs');
  return onSnapshot(donationsRef, (snapshot) => {
    const donationsData = snapshot.docs.map((doc) => doc.data());
    const totalDonations = donationsData.length;

    const today = new Date();
    const donatStartOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const nextday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const donatStartOfThisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const donatEndOfThisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()+7);
    const donatStartOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const donatEndOfThisMonth = new Date(today.getFullYear(), today.getMonth()+1, 1);

    // console.log(donatStartOfThisMonth,donatEndOfThisMonth);
    const donationsMadeDaily = donationsData.filter((donation) => {
      const donationDate = new Date(donation.dateDonating);
      return donationDate >= donatStartOfToday && donationDate < nextday;
    }).length;

    const donationsMadeWeekly = donationsData.filter((donation) => {
      const donationDate = new Date(donation.dateDonating);
      return donationDate >= donatStartOfThisWeek && donationDate < donatEndOfThisWeek;
    }).length;

    const donationsMadeMonthly = donationsData.filter((donation) => {
      const donationDate = new Date(donation.dateDonating);
      return donationDate >= donatStartOfThisMonth && donationDate < donatEndOfThisMonth;
    }).length;

    const approvedDonations = donationsData.filter((donation) => donation.adminVerify === true).length;
    const rejectedDonations = donationsData.filter((donation) => donation.adminVerify === false).length;

    const donationsReport = {
      totalDonations,
      donationsMadeDaily,
      donationsMadeWeekly,
      donationsMadeMonthly,
      approvedDonations,
      rejectedDonations,
    };

    callback(donationsReport);
  });
};

//requests
const listenReqsReport = (callback) => {
  const reqsRef = collection(db, 'REQs');
  return onSnapshot(reqsRef, (snapshot) => {
    const reqsData = snapshot.docs.map((doc) => doc.data());
    const totalReqs = reqsData.length;

    const today = new Date();
    const nextday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const reqStartOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const reqStartOfThisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const reqEndOfThisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()+7);
    const reqStartOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const reqEndOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 2);

    const reqsMadeDaily = reqsData.filter((req) => {
      const reqDate = new Date(req.dateDonating);
      return reqDate >= reqStartOfToday && reqDate < nextday;
    }).length;

    const reqsMadeWeekly = reqsData.filter((req) => {
      const reqDate = new Date(req.dateDonating);
      return reqDate >= reqStartOfThisWeek && reqDate < reqEndOfThisWeek;
    }).length;

    const reqsMadeMonthly = reqsData.filter((req) => {
      const reqDate = new Date(req.dateDonating);
      return reqDate >= reqStartOfThisMonth && reqDate < reqEndOfThisMonth;
    }).length;

    const approvedReqs = reqsData.filter((req) => req.adminVerify === true).length;
    const rejectedReqs = reqsData.filter((req) => req.adminVerify === false).length;

    const reqsReport = {
      totalReqs,
      reqsMadeDaily,
      reqsMadeWeekly,
      reqsMadeMonthly,
      approvedReqs,
      rejectedReqs,
    };

    // console.log(reqStartOfThisWeek,reqEndOfThisWeek);
    callback(reqsReport);
  });
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



    return { listenDonationsReport,listenTotalUsers,listenReqsReport,    };
        
    };
    
    export default useFirebaseChart;