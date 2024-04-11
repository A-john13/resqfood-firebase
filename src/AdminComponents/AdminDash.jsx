import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminCard from "./AdminCard";
import AdminTable, { UserTable } from "./AdminTable";
import {useNavigate} from "react-router-dom";

import { useFirebase } from "../Config/firebase";
import useFirebaseCRUD from "../Config/firebaseCRUD";
import "./CSS/AdminDash.css";

const AdminDash = () => {
  const nav=useNavigate();
  const firebase = useFirebase();
  const { fetchDonations, fetchRequests,fetchUserDetails } = useFirebaseCRUD();

  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [donationUserData, setDonationUserData] = useState([]);
  const [reqsUserData, setReqsUserData] = useState([]);
  const [userDatas, setUserDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedDonations, fetchedDonationUserData] = await fetchDonations();
      setDonations(fetchedDonations);
      setDonationUserData(fetchedDonationUserData);

      const [fetchedRequests, fetchedReqsUserData] = await fetchRequests();
      setRequests(fetchedRequests);
      setReqsUserData(fetchedReqsUserData);

      const details =  await fetchUserDetails();
      // console.log(details)
      setUserDatas(details);
    };

    console.log(userDatas,"wtf")
    fetchData();
  }, []);


  const [showUsers, setShowUsers] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [selectedTab, setSelectedTab] = useState("");
  const handleTabClick = (tabName) => {
    setShowTable(true);
    setShowCard(true);
    setSelectedTab(tabName);
    setShowUsers(false);
  };

  const out =() =>{
    firebase.SignOut();
    nav('/');
  }

  useEffect(() => {
    localStorage.setItem("adminDashState", JSON.stringify({ showUsers, showTable, showCard, selectedTab }));
  }, [showUsers, showTable, showCard, selectedTab]);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("adminDashState"));
    if (savedState) {
      setShowUsers(savedState.showUsers);
      setShowTable(savedState.showTable);
      setShowCard(savedState.showCard);
      setSelectedTab(savedState.selectedTab);
    }
  }, []);

  return (
    <div className="adminDash">
      <Navbar bg="dark" variant="dark" className="p-2 pe-0">
        <Container fluid className="m-0 p-0">
          <Navbar.Brand as={Link} to="/user/role/adminDash" className="p-0 brandLogo">
            <img src="/Logo.png" alt="Logo" style={{ height: "50px",width: "80px",  marginRight: "40px", marginLeft: "30px", }} />
            <strong style={{ marginLeft: "10px" }}>Admin Dashboard</strong>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col sm={3} className="m-0 p-0 sidebar">
            <Navbar
              className="m-0 p-0 flex-column justify-content-start adminSidebar"
              style={{ height: "100dvh" }}
              bg="secondary"
              variant="primary">
              <Nav.Item>
                <Nav.Link
                  className="p-4"
                  onClick={() => {
                    setShowUsers(true),
                    setShowTable(false); setShowCard(false);}}>
                  Users
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="p-4"
                  onClick={() => handleTabClick("Requests")}>
                  Requests
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="p-4"
                  onClick={() => handleTabClick("Donations")}>
                  Donations
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="p-4" as={Link} to="#">
                  Reports
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="p-4" as={Link} to="/user/role/adminDash/posibleMatches">
                  Combinations
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="p-4">
                <Button variant="warning" onClick={out}>
                  Logout
                </Button>
              </Nav.Item>
            </Navbar>
          </Col>
          <Col className="m-0 p-2 contentsTables">
            <Container className="p-2 m-0"  fluid>

              
            {showUsers && <UserTable data={userDatas} />}
            {showTable && selectedTab === "Requests" && (
                <AdminTable caption="Requests" data={requests}  userData={reqsUserData}/>
              )}
              {showTable && selectedTab === "Donations" && (
                <AdminTable caption="Donations" data={donations} userData={donationUserData} />
              )}
              {showCard && selectedTab === "Combinations" && (
                <AdminTable caption="Combinations" data={combinations} />
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDash;
