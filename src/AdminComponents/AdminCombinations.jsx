import React, { useState, useEffect } from "react";
import useFirebaseCRUD from "../Config/firebaseCRUD";
import { useFirebase } from "../Config/firebase";
import { doc,updateDoc } from "firebase/firestore";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import './CSS/AdminCombinations.css'

const AdminInterface = () => {
  const firebase = useFirebase();
  const [matchedData, setMatchedData] = useState([]);
  const { fetchPossibleMatches,storeMatch,PostNotifications } = useFirebaseCRUD();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const matches = await fetchPossibleMatches();
      setMatchedData(matches);
    };
    // console.log(matchedData, "matches");
    fetchData();
  }, []);
  const openEditModal = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // const handleEdit = (updatedData) => {
  //   closeEditModal();
  // };

  const approve = async (item) => {
    try {
      // console.log(item);
      // console.log(item.donationId, item.requestId, item.donationData.qtyDonating, item.donationData.dateDonating,item.requestData.district,);
      await storeMatch(item.donationId, item.requestId, item.donationData.qtyDonating, item.donationData.dateDonating,item.requestData.district, '1');
  
      // Send notifications
     await PostNotifications(item.donationData.donorID,null,null, "Your donation has been matched with a request.Thankyou for the donating.");
    await PostNotifications(item.requestData.recipientID,null,null, "Your request has been matched with a donation.");
    } catch (error) {
      console.error('Error approving donation and request:', error);
    }
  };

  
  return (
    <div className="p-3 possbileMatches">
      <h1>Admin Interface</h1>
      <Table className="possibleMatchesTable captilize" variant="secondary" style={{width:'75dvw'}} striped  hover bordered>
        <thead>
          <tr>
            <th>Donation Name</th>
            <th>Request Name</th>
            {/* <th>Donation Status</th>
            <th>Request Status</th> */}
            <th>Date Donationg</th>
            <th>Quantity Donating</th>
            <th>Requested Quantity</th>
            <th>District</th>
            {/* <th>Actions</th> */}
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {matchedData.map((item) => (
            <>
              <tr key={item.id}>
                <td> 
                  {item.donationData.fullName}
                </td>
                <td>
                   {item.requestData.fullName}
                </td>
                {/* <td>
                  {item.donationData.status===1? "Approved": "Not Approved"}
                </td> */}

                {/* <td>
                  {item.requestData.status===1? "Approved": "Not Approved"}
                </td> */}

                <td>
                  {item.donationData.dateDonating}
                </td>
                <td>
                  {item.donationData.qtyDonating}
                </td>

                <td>
                  {item.requestData.requiredQty}
                </td>
                <td>
                  {item.requestData.district}
                </td>
                {/* <td>
                <Button style={{ background: "red",color:'black',fontWeight:'bold', width: "95%" }} 
                onClick={() => openEditModal(item)}>Edit</Button>
                </td> */}
                <td>
                  {item.donationData.status===0 && item.requestData.status===0 ? 
                <Button style={{ background: "#46794b",color:'white',fontWeight:'bold', width: "95%" }} 
                onClick={() => approve(item)}>Approve</Button> : <strong>Approved</strong>
                  }
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>

      {isEditModalOpen && (
        <EditModal
          item={selectedItem}
          onEdit={handleEdit}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default AdminInterface;

// <td>
// Expiration Time:{" "}
// {item.requestData.ExpirationTime}
// </td>

// <td>
// Pin Code: {item.requestData.pinCode}
// </td>
//    <td>
//       Donating Street:{" "}
//       {item.requestData.Donating_Street}
//    </td>
//     <td>
//       Alternate Phone:{" "}
//       {item.requestData.alternatePhone}
//    </td>
//     <td>
//       Donation Address:{" "}
//       {item.requestData.Donation_Address}
//    </td>
