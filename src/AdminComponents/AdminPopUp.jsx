import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useFirebase } from "../Config/firebase";
import { getFirestore, doc, onSnapshot, updateDoc,where,query,collection } from "firebase/firestore";
import './CSS/AdminPopUp.css'

const AdminPopUp = ({ caption, showModal, handleClose, rowData,userID,data }) => {
  const firebase = useFirebase();
  const [donat_data, setdonat_data] = useState(null);
  const [donorData, setDonorData] = useState(null);
  const db = getFirestore();
  console.log(caption);

  useEffect(() => {
    const fetchData = async () => {
      console.log(caption);
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
    };

    fetchData();
  }, [db, rowData, userID, caption]);

  console.log("donat_Data",donat_data);
  console.log("donor_Data",donorData);

  const handleVerify = async () => {
    try {
      if(caption=== 'Donations'){
      const docRef = doc(db, 'DONATs', rowData);
    }
    else if(caption==='Requests'){
      const docRef = doc(db, 'REQs', rowData);
    }

      await updateDoc(docRef, {
        adminVerify: true,
      });
      alert("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="adminDetailPopUp">
      <Modal show={showModal} onHide={handleClose} animation={false} variant="dark" className="popup">
        <Modal.Header closeButton>
          <Modal.Title>{caption} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {donat_data && donorData && (
            <>
              <p className="label" >Name: {donorData.fullName}</p>
              <p className="label" >Verify: {donat_data.adminVerify === true ? "approved" : "not verified"}</p>
              <p className="label" >Status: {donat_data.status === 0 ? "active" : 'completed'}</p>
              <p className="label" >Date: {donat_data.dateDonating}</p>
              <p className="label" >Phone: {donorData.phone}</p>
              <p className="label" >Quantity: {donat_data.qtyDonating}</p>
              <p className="label" >Organisation Name: {donat_data.isOrg === "true" ? donat_data.orgName : "NULL"}</p>
              <p className="label" >Address: {donat_data.Donation_Address}</p>
              <p className="label" >Meal Type: {donat_data.mealType}</p>
              <p className="label" >Expiration: {donat_data.ExpirationTime}</p>
              <p className="label" >Click for proof: <a href={donorData.proof} target="_blank" rel="noreferrer">Proof Link</a></p>
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
