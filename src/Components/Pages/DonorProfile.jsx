import React, { useEffect, useState } from "react";
import { Container,Row,Col,Accordion,Form,FloatingLabel,Offcanvas,Button,Modal} from "react-bootstrap";
import useFirebaseCRUD from "../../Config/firebaseCRUD";
import { useFirebase } from "../../Config/firebase";
import NavBar from "../Reusable/Nav";

import "./CSS/DonorProfile.css";

const DonorProfile = ({ title, value, icon }) => {
  const firebase = useFirebase();
  const { UID } = useFirebase();
  const { getDonatData, userData , fetchMatchesByRequestId} = useFirebaseCRUD();
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
        // console.log("Total Donations:", totalDonations);
        // console.log("Upcoming Donations:", upcomingDonations);
        // console.log("Past Donations:", pastDonations);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [UID, getDonatData]);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleUpdate = async (event) => {
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      
    } else if (formData.orgDistrict===''){
      event.preventDefault();
      event.stopPropagation();
    }    
    setValidated(true);
    try {
      event.preventDefault();
      const id =  updateUserData(formData);
      
    } catch (error) {
      alert(error)
      console.error("Error adding user data:", error);
    }
  
  }
  const [formData, setFormData] = useState({
    firstName: "",
    fullName: "",
    address: "",
    district: "",
    pinCode: "",
    phone: "",
  });
  const districts = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam',
    'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode',
    'Wayanad', 'Kannur', 'Kasaragod'
  ];

  const handleChange = (e) => {
    const { name, value  } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const req= fetchMatchesByRequestId();
  return (
    <div className="px-5 donorDash">
      <>
        <NavBar></NavBar>
        <Row className="py-3" style={{height:'fit-content',justifySelf:'center'}}>
        <Button variant="primary" onClick={handleShow} style={{width:'20%'}}>
        Profile
        </Button>
        </Row>
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
          {/* <Row className="my-4">
            <Col>
              <DonationHistoryTable />
            </Col>
          </Row> */}
        </div>

        <>
      <Offcanvas show={show} onHide={handleClose} style={{width:'45dvw'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {/* <Row style={{margin:'auto', width:'35%'}} className="pb-2">
        <Button variant="primary" onClick={handleUpdate}>
        Update
      </Button>
      </Row> */}
        <Col className="px-2 ms-3" >
          <Accordion defaultActiveKey="0" className="text-center">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Details</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>
                <FloatingLabel label="Name" className="mb-3">
                  <Form.Control value={userData.fullName} className="capitalize"></Form.Control>
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel label="Admin Verified" className="mb-3">
                  <Form.Control value={userData.adminVerifyDetails ? "Yes" : "No"} className="capitalize"></Form.Control>
                </FloatingLabel>
                </Col></Row>
                <Row>
                  <Col>
                <FloatingLabel label="District" className="mb-3">
                  <Form.Control value={userData.district} className="capitalize"></Form.Control>
                </FloatingLabel>
                </Col><Col>
                <FloatingLabel label="Address" className="mb-3">
                  <Form.Control value={userData.address} className="capitalize"></Form.Control>
                </FloatingLabel>
                </Col></Row>
                <Row>
                  <Col>
                <FloatingLabel label="Pincode" className="mb-3">
                  <Form.Control value={userData.pinCode} className="capitalize"></Form.Control>
                </FloatingLabel>
                </Col><Col>
                <FloatingLabel label="Phone" className="mb-3">
                  <Form.Control value={userData.phone} className="capitalize"></Form.Control>
                </FloatingLabel>
                </Col></Row>
                <Row>
                  <Col>
                <FloatingLabel label="Email" className="mb-3">
                  <Form.Control value={firebase.user.email} ></Form.Control>
                </FloatingLabel>
                </Col></Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>ID</Accordion.Header>
              <Accordion.Body>
                <img src={userData.proof} alt="" style={{height:'200px',width:"90%"}}/>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        </Offcanvas.Body>
      </Offcanvas>
    </>

    <>
    <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Form className="p-3 updateForm" validated={validated} onSubmit={handleUpdate}> 
        <Row>
          <Col style={{width:'80%'}}>
          <Form.Group className="mb-4">
                <FloatingLabel label="Full Name" >
                  <Form.Control className="capitalize" name="fullName" type="text" placeholder="Fullname" required onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">Please enter your full name </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-2 m-0 ">
            <Col>
              <Form.Group className="mb-4">
                <FloatingLabel label="Address">
                  <Form.Control className="capitalize" name="address" type="textArea" placeholder="address" required onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">Please enter your address </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
            
           
          </Row>
          <Col md>
              <Form.Group className="mb-4">
                <FloatingLabel label="Pin Code">
                  <Form.Control name="pinCode" type="text" pattern="[0-9]{6}" placeholder="Pincode" required onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">Please enter valid pincode </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col md >
              <Form.Group className="mb-4">
                <FloatingLabel label="District">
                <Form.Control
                  as="select"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  placeholder="Enter district"
                > <option value=''>Select District</option>
                {districts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
                 <Form.Control.Feedback type="invalid">Please select a district </Form.Control.Feedback>
                </Form.Control>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col md >
              <Form.Group className="mb-4">
                <FloatingLabel label="Phone">
                  <Form.Control name="phone" type="tel" pattern="[0-9]{10}" placeholder="Phone" required onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">Please enter a valid 10 digit number  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
          <Button variant="primary" type="submit">Update</Button>
        </Form> 
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
      </>

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
