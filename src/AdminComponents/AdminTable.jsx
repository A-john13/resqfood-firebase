import React, { useState, useEffect } from "react";
import { Table, Modal, Button,Alert } from "react-bootstrap";
import AdminPopUp from "./AdminPopUp";
import { updateDoc,doc,getFirestore,getDocs,query,where,collection } from "firebase/firestore";
import "./CSS/AdminTable.css";
import useFirebaseCRUD from "../Config/firebaseCRUD";
import {useFirebase} from "../Config/firebase";

const AdminTable = ({ caption, data, userData }) => {
console.log(data)

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedUserID, setSelectedUserID] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (rowId, donorId) => {
    setSelectedRow(rowId);
    setSelectedUserID(donorId || recipientID);
    setShowModal(true);
  };
  return (
    <div className="px-3 adminTable">
      <h2 className="text-center">{caption}</h2>
      <Table striped bordered hover size=""  variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>{caption === "Donations" ? "Donor" : "Recipient"} Name</th>
            <th>Donation Date</th>
            {caption === "Donations" && <th>Address</th>}
            {caption === "Requests" && <th>Food Supply</th>}
            <th>Click for More</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.fullName}</td>
              <td>{row.dateDonating}</td>
              {caption === "Donations" && <td>{row.Donation_Address}</td>}
              {caption === "Requests" && <td>{row.addressDelivery}</td>}
              <td>
                <Button
                  onClick={() => handleShow(row.id, row.donorID || row.recipientID)} // Pass donorID here
                  style={{ background: "purple", width: "80%" }}>
                  Click Here
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedRow !== null && (
        <AdminPopUp
          data={data}
          caption={caption}
          showModal={showModal}
          handleClose={handleClose}
          rowData={selectedRow}
          userID={selectedUserID}
        />
      )}
    </div>
  );
};

export default AdminTable;


export const UserTable =( {data} )=>{
  const firebase = useFirebase();
  const db =getFirestore();
  const {fetchUserDetails,PostNotifications} =useFirebaseCRUD();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [userDatas, setUserDatas] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchUserDetails(setUserDatas);
    return () => unsubscribe;
  }, []);

console.log(userDatas);
  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleVerify = async (uid) => {
    try {
    console.log(uid,"upadate");
    const querySnapshot = await getDocs(query(collection(db, "USER_DATA"), where('uid', '==', uid)));
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        adminVerifyDetails: true,
      });
      const notif = await PostNotifications(uid,null,null,"Your Account is now verified")
      setShowAlert(true);
      handleCloseModal();
    } else {
      console.error("Document does not exist");
    }
      setShowAlert(true);
    } catch (error) {
      console.error("Error updating document: ", error);
    }

  };

  return (
    <div className="px-3 adminUseModal">
      <h2 className="text-center">User Data</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Admin Verify</th>
            <th>First Name</th>
            <th>Phone</th>
            <th>Click for more</th>
          </tr>
        </thead>
        <tbody>
          {userDatas.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.adminVerifyDetails===true ? "verified" : "not verified"}</td>
              <td>{user.firstName}</td>
              <td>{user.phone}</td>
              <td>
                <Button
                  onClick={() => handleShowModal(user)}
                  style={{ background: "springgreen",color:'black',fontWeight:'bold', width: "80%" }}
                >
                  Click Here
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        variant="dark"
        show={showModal}
        onHide={handleCloseModal}
        scrollable
        backdrop="static"
        centered
        keyboard={false}
        style={{ background: 'rgba(255, 255, 255, 0.5)' }}
      >
         {selectedUser &&  (
          <>
        <Modal.Header closeButton>
          <Modal.Title>First Name: {selectedUser.firstName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
            <h5 className="h5" style={{ color: "purple",font:'bold'}}>Verified: {selectedUser.adminVerifyDetails ? "Verified" : "Not Verified"}</h5>
            <p>Full Name: {selectedUser.fullName}</p>
            <p>Address: {selectedUser.address}</p>
            <p>District: {selectedUser.district}</p>
            <p>Pin Code: {selectedUser.pinCode}</p>
            <p>With Organization: {selectedUser.isOrg ? "Yes" : "No"}</p>
            <p>Phone: {selectedUser.phone}</p>
            <p>Proof URL: <a href={selectedUser.proof} target="_blank" rel="noreferrer">Click Here</a></p>
            <Button variant="info" onClick={() => { handleVerify(selectedUser.uid); } }>
            Verify
          </Button>
        
        </Modal.Body>
        </>
          )}

          {showAlert  &&
          <Alert  variant='info'>
            Verification update!!
        </Alert>
        }
      </Modal>
    </div>
  );
};