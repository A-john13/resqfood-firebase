import React, { useState, useEffect } from "react";
import { useFirebase } from "../Config/firebase";
import useFirebaseCRUD from "../Config/firebaseCRUD";
import { Table,Modal,Button,Form } from "react-bootstrap";

const AutomaticMatching = () => {
    const firebase = useFirebase();
    const { fetchDonations, fetchRequests, createCombination, fetchCombination, updateCombination } = useFirebaseCRUD();
    const [donations, setDonations] = useState([]);
    const [requests, setRequests] = useState([]);
    const [combinations, setCombinations] = useState([]);
    const [editDonation, setEditDonation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDonations = await fetchDonations();
      setDonations(fetchedDonations);

      const fetchedRequests = await fetchRequests();
      setRequests(fetchedRequests);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const matchDonationsToRequests = () => {
      const matchedDonations = [];
      const matchedRequests = [];
      const remainingDonations = [];
      const remainingRequests = [...requests];

      donations.forEach(donation => {
        const matchingRequestIndex = remainingRequests.findIndex(request => request.status === "open" && request.requiredQty <= donation.qtyDonating);

        if (matchingRequestIndex !== -1) {
          const matchedRequest = remainingRequests[matchingRequestIndex];
          matchedDonations.push(donation);
          matchedRequests.push(matchedRequest);
          remainingRequests.splice(matchingRequestIndex, 1);
        } else {
          remainingDonations.push(donation);
        }
      });

      // Update state and add matches to combinations collection
      setDonations(remainingDonations);
      setRequests(remainingRequests);

      matchedDonations.forEach(async donation => {
        const matchedRequest = matchedRequests.find(request => request.requiredQty <= donation.qtyDonating);
        if (matchedRequest) {
          await createCombination({
            donationId: donation.id,
            requestId: matchedRequest.id,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        }
      });
    };

    matchDonationsToRequests();
  }, [donations, requests, createCombination, firebase]);


  const handleViewDetails = async (combination) => {
    const donation = await fetchDonation(combination.donationId);
    const request = await fetchRequest(combination.requestId);
    console.log("Donation:", donation);
    console.log("Request:", request);
    // Implement logic to show details in a modal or new page
  };

  const handleEdit = (donation) => {
    setEditDonation(donation);
  };

  const handleSaveDonation = async () => {
    if (editDonation) {
      await updateDonation(editDonation.id, editDonation); // Implement updateDonation method in firebaseCRUD
      setEditDonation(null);
    }
  };

  const handleReject = async (combination) => {
    await updateCombination(combination.id, { status: "rejected" });
  };

  const handleApprove = async (combination) => {
    await updateCombination(combination.id, { status: "approved" });
  };
  return (

    <>

    <div>
      <h2>Automatic Matching</h2>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th>Donation ID</th>
          <th>Request ID</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
        <tbody>
        {combinations.map((combination, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{combination.donationId}</td>
            <td>{combination.requestId}</td>
            <td>{combination.status}</td>
            <td>
              <Button variant="primary" onClick={() => handleViewDetails(combination)}>View Details</Button>{' '}
              <Button variant="secondary" onClick={() => handleEdit(combination)}>Edit</Button>{' '}
              <Button variant="danger" onClick={() => handleReject(combination)}>Reject</Button>{' '}
              <Button variant="success" onClick={() => handleApprove(combination)}>Approve</Button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>




<Modal show={!!editDonation} onHide={() => setEditDonation(null)}>
<Modal.Header closeButton>
  <Modal.Title>Edit Donation</Modal.Title>
</Modal.Header>
<Modal.Body>
  <Form>
    <Form.Group controlId="formQuantity">
      <Form.Label>Quantity</Form.Label>
      <Form.Control
        type="number"
        value={editDonation?.qtyDonating}
        onChange={(e) => setEditDonation({ ...editDonation, qtyDonating: e.target.value })}
      />
    </Form.Group>
    {/* Add more fields as needed */}
  </Form>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={() => setEditDonation(null)}>Close</Button>
  <Button variant="primary" onClick={handleSaveDonation}>Save Changes</Button>
</Modal.Footer>
</Modal>

</>
  );
};

export default AutomaticMatching;
