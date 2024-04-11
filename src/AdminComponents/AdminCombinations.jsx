import React, { useState, useEffect } from "react";
import useFirebaseCRUD from "../Config/firebaseCRUD";

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
    <div>
      <h1>Admin Interface</h1>
      <table>
        <thead>
          <tr>
            <th>Donation Name</th>
            <th>Request Name</th>
            <th>Donation Status</th>
            <th>Request Status</th>
            <th>Date Donationg</th>
            <th>Meal Type</th>
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
              <tr key={item.index}>
                <td>
                  <strong>{item.donationData.fullName}</strong>
                </td>
                <td>
                  <strong> {item.requestData.fullName}</strong>
                </td>
                <td>
                  <strong>{item.donationData.status}</strong>
                </td>

                <td>
                  <strong>{item.requestData.status}/</strong>
                </td>

                <td>
                  <strong>{item.donationData.dateDonating}</strong>
                </td>
                <td>
                  <strong>{item.donationData.mealType}/</strong>
                </td>
                <td>
                  <strong>{item.donationData.qtyDonating}/</strong>
                </td>

                <td>
                  <strong>{item.requestData.requiredQty}/</strong>
                </td>
                <td>
                  <strong>{item.requestData.District}/</strong>
                </td>
                <td>
                  <button onClick={() => openEditModal(item)}>Edit</button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>

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
// <strong>Expiration Time:</strong>{" "}
// {item.requestData.ExpirationTime}
// </td>

// <td>
// <strong>Pin Code:</strong> {item.requestData.pinCode}
// </td>
//    <td>
//       <strong>Donating Street:</strong>{" "}
//       {item.requestData.Donating_Street}
//    </td>
//     <td>
//       <strong>Alternate Phone:</strong>{" "}
//       {item.requestData.alternatePhone}
//    </td>
//     <td>
//       <strong>Donation Address:</strong>{" "}
//       {item.requestData.Donation_Address}
//    </td>
