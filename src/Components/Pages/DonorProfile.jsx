import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import useFirebaseCRUD from "../../Config/firebaseCRUD";
import { useFirebase } from "../../Config/firebase";
import NavBar from "../Reusable/Nav";

import "./CSS/DonorProfile.css";

const DonorProfile = ({ title, value, icon }) => {
  const firebase = useFirebase();
  const { UID } = useFirebase();
  const { getDonatData, userData } = useFirebaseCRUD();
  const [totalDonations, setTotalDonations] = useState(0);
  const [upcomingDonations, setUpcomingDonations] = useState(0);
  const [pastDonations, setPastDonations] = useState(0);

  useEffect(() => {
    getDonatData()
      .then((userData) => {
        console.log("User data:", userData, UID);
        const total = userData.length;
        const upcoming = userData.filter(
          (donation) => donation.adminVerify && donation.status === 0
        ).length;
        const past = userData.filter(
          (donation) => donation.adminVerify && donation.status === 1
        ).length;
        setTotalDonations(total);
        setUpcomingDonations(upcoming);
        setPastDonations(past);
        console.log("Total Donations:", totalDonations);
        console.log("Upcoming Donations:", upcomingDonations);
        console.log("Past Donations:", pastDonations);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [UID, getDonatData]);
  return (
    <div className="px-5 donorDash">
      <>
        <NavBar></NavBar>
      </>

      <h1 className="py-4 text-center">Donor Dashboard</h1>
      <div className="d-flex left">
        <div className="profile" style={{ width: "50dvw" }}>
          <Row>
            <Col md xs={12} style={{ height: "max-content" }}>
              <DonorInfoCard
                title="Total Donations"
                value={totalDonations}
                icon="bi-currency-dollar"
              />
            </Col>

            <Col md xs={12} style={{ height: "max-content" }}>
              <DonorInfoCard
                title="Upcoming Donations"
                value={upcomingDonations}
                icon="bi-calendar-event"
              />
            </Col>

            <Col md xs={12} style={{ height: "max-content" }}>
              <DonorInfoCard
                title="Past Donations"
                value={pastDonations}
                icon="bi-calendar-x"
              />
            </Col>
          </Row>
          <Row className="my-4">
            <Col>
              <DonationHistoryTable />
            </Col>
          </Row>
        </div>

        <Col className="px-2 ms-3" md={3}>
          <Accordion defaultActiveKey="0" className="text-center">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Details</Accordion.Header>
              <Accordion.Body>
                <FloatingLabel label="Name" className="mb-3">
                  <Form.Control value={userData.fullName} className="capitalize"></Form.Control>
                </FloatingLabel>
                <FloatingLabel label="Admin Verified" className="mb-3">
                  <Form.Control value={userData.adminVerifyDetails ? "Yes" : "No"} className="capitalize"></Form.Control>
                </FloatingLabel>
                <FloatingLabel label="District" className="mb-3">
                  <Form.Control value={userData.district} className="capitalize"></Form.Control>
                </FloatingLabel>
                <FloatingLabel label="Address" className="mb-3">
                  <Form.Control value={userData.address} className="capitalize"></Form.Control>
                </FloatingLabel>
                <FloatingLabel label="Pincode" className="mb-3">
                  <Form.Control value={userData.pinCode} className="capitalize"></Form.Control>
                </FloatingLabel>
                <FloatingLabel label="Phone" className="mb-3">
                  <Form.Control value={userData.phone} className="capitalize"></Form.Control>
                </FloatingLabel>
                <FloatingLabel label="Email" className="mb-3">
                  <Form.Control value={firebase.user.email} ></Form.Control>
                </FloatingLabel>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>ID</Accordion.Header>
              <Accordion.Body>
                <img src={userData.proof}  style={{height:'200px',width:"90%"}} alt="" />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </div>
    </div>
  );
};

const DonorInfoCard = ({ title, value, icon }) => {
  return (
    <div className="info-card bg-light text-center p-4">
      <i className={`bi ${icon} display-4`}></i>
      <h3 className="my-3">{value}</h3>
      <p className="text-muted">{title}</p>
    </div>
  );
};

const DonationHistoryTable = ({ donations }) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Recipient</th>
          {/* <th>Food Item</th> */}
          <th>Quantity</th>
          <th>Pickup Date</th>
        </tr>
      </thead>
      <tbody>
        {/* {donations.map((donation, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{donation.recipient}</td>
            <td>{donation.quantity}</td>
            <td>{donation.pickupDate}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
};

export default DonorProfile;
