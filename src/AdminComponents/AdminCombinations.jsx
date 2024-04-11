import React, { useState, useEffect } from "react";
import useFirebaseCRUD from "../Config/firebaseCRUD";
import Table from 'react-bootstrap/Table'

import './CSS/AdminCombinations.css'
const AdminInterface = () => {
  const [matchedData, setMatchedData] = useState([]);
  const { fetchPossibleMatches } = useFirebaseCRUD();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const matches = await fetchPossibleMatches();
      setMatchedData(matches);
    };
    console.log(matchedData, "matches");
    fetchData();
  }, []);
  const openEditModal = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEdit = (updatedData) => {
    // Update matched donation/request with updatedData
    // Update UI
    // Close edit modal
    closeEditModal();
  };

  return (
    <div className="p-3 possbileMatches">
      <h1>Admin Interface</h1>
      <Table className="possibleMatchesTable" variant="secondary" style={{width:'75dvw'}}>
        <thead>
          <tr>
            <th>Donation Name</th>
            <th>Request Name</th>
            <th>Donation Status</th>
            <th>Request Status</th>
            <th>Date Donationg</th>
            <th>Quantity Donating</th>
            <th>Requested Quantity</th>
            <th>District</th>
            <th>Actions</th>
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
                <td>
                  {item.donationData.status}
                </td>

                <td>
                  {item.requestData.status}
                </td>

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
                <td>
                  <button onClick={() => openEditModal(item)}>Edit</button>
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
