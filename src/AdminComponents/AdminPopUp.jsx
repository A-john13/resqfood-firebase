import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useFirebase } from "../Config/firebase";
import { getFirestore, doc, onSnapshot, updateDoc,where,query,collection } from "firebase/firestore";
import './CSS/AdminPopUp.css'

const AdminPopUp = ({ caption, showModal, handleClose, rowData,userID,data }) => {
  const firebase = useFirebase();
  const [donat_data, setdonat_data] = useState(null);
  const [donorData, setDonorData] = useState(null);
  const [orgData, setOrgData] = useState(null);
  const db = getFirestore();
  console.log(caption);

  useEffect(() => {
    const fetchData = async () => {
      console.log(rowData,"rowData",userID,"user")
      if (caption === "Donations") {
        const docRef = doc(db, 'DONATs', rowData);
        onSnapshot(docRef, (doc) => {
          setdonat_data(doc.data());
        });
      } else if(caption==="Requests") {
        const queryRef = doc(db, 'REQs',rowData);
        onSnapshot(queryRef, (doc) => {
            setdonat_data(doc.data());
          });
      }

      const userQueryRef = query(collection(db, 'USER_DATA'), where('uid', '==', userID));
      onSnapshot(userQueryRef, (snapshot) => {
        snapshot.forEach((doc) => {
          setDonorData(doc.data());
        });
      });
      const orgQueryRef = query(collection(db, 'Org_DATA'), where('representID', '==', userID));
      onSnapshot(orgQueryRef, (snapshot) => {
        snapshot.forEach((doc) => {
          setOrgData(doc.data());
        });
      });
    };

    fetchData();
  }, [db, rowData, userID, caption]);

  // console.log("donat_Data",donat_data);
  // console.log("donor_Data",donorData);
// console.log(orgData);

  const handleVerify = async () => {
    try {
      if(caption=== 'Donations'){
      const docRef = doc(db, 'DONATs', rowData);
      
      await updateDoc(docRef, {
        adminVerify: true,
      });
      alert("Document successfully updated!");
    }
    else if(caption==='Requests'){
      const docRef = doc(db, 'REQs', rowData);
      await updateDoc(docRef, {
        adminVerify: true,
      });
      alert("Document successfully updated!");
    }

    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="adminDetailPopUp">
      <Modal show={showModal} onHide={handleClose} animation={false} variant="dark" dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{caption} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {donat_data && donorData && (
            <>
              <p className="label" >Donor Name: {donorData.fullName}</p>
              <h5 className="label" style={{colr:'red'}}>Verified: {donat_data.adminVerify === true ? "approved" : "not verified"}</h5>
              <p className="label" >Status: {donat_data.status === 0 ? "active" : 'completed'}</p>
              <p className="label" >Donation Date: {donat_data.dateDonating}</p>
              <p className="label" >Phone: {donorData.phone}</p>
              <p className="label" >Quantity: {donat_data.qtyDonating}  
                              <br />(as in number of persons)</p>
              <p className="label" >Organisation Name: {donorData.isOrg === true ? orgData.orgName : "NULL"}</p>
              <p className="label" >Address: {donat_data.Donation_Address}</p>
              <p className="label" >Meal Type: {donat_data.mealType}</p>
              <p className="label" >Expiration: {donat_data.ExpirationTime}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleVerify}>
            Verify
          </Button>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPopUp;
