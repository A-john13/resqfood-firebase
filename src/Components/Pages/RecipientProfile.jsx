import React, { useEffect, useState } from "react";
import { Container, Row, Col,Accordion,FloatingLabel,Form,Button,Offcanvas,Modal } from 'react-bootstrap';
import './CSS/RecipientProfile.css'
import useFirebaseCRUD from '../../Config/firebaseCRUD';
import { useFirebase } from '../../Config/firebase';
import NavBar from '../Reusable/Nav';

const RecipientProfile = () => {
  const firebase = useFirebase();
  const { UID } = useFirebase();
// console.log(userData);
  const [show, setShow] = useState(false);

  const { getReqsData, userData,fetchMatchesByDonationId } = useFirebaseCRUD();
  const [totalReqs, setTotalReqs] = useState(0);
  const [upcomingReqs, setUpcomingReqs] = useState(0);
  const [pastReqs, setPastReqs] = useState(0);

  useEffect(() => {
    getReqsData(UID)
      .then((userData) => {
        console.log("User data:", userData, UID);
        const total = userData.length;
        const upcoming = userData.filter(
          (req) => req.adminVerify && req.status === 0
        ).length;
        const past = userData.filter(
          (req) => req.adminVerify && req.status === 1
        ).length;
        setTotalReqs(total);
        setUpcomingReqs(upcoming);
        setPastReqs(past);
        console.log("Total Reqs:", totalReqs);
        console.log("Upcoming Reqs:", upcomingReqs);
        console.log("Past Reqs:", pastReqs);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [UID, getReqsData]);


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
      const id =  addUserData(formData);
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

const donat = fetchMatchesByDonationId();
      return (
    
        <Container className="px-5 justify-content-center recipientDash" fluid>

            <>
            <NavBar></NavBar>
            <Row className="py-3" style={{height:'fit-content',justifySelf:'center'}}>
            <Button variant="primary" onClick={handleShow} style={{width:'20%'}}>
              Profile
            </Button>
             </Row>
            </>
          <h1 className="my-4 text-center">Recipient Dashboard</h1>
      <div className="d-flex left">
        <div className="profile" style={{ width: "50dvw" }}>
          <Row>
            <Col md={4} xs={12}>
              <RecipientInfoCard
                title="Total Requests Received"
                value={totalReqs}
                icon="bi-basket-fill"
              />
            </Col>
    
            <Col md={4} xs={12}>
              <RecipientInfoCard
                title="Upcoming Donations"
                value={upcomingReqs}
                icon="bi-calendar-event"
              />
            </Col>
    
            <Col md={4} xs={12}>
              <RecipientInfoCard
                title="Past Donations"
                value={pastReqs}
                icon="bi-calendar-x"
              />
            </Col>
          </Row>
    
          {/* <Row className="my-4">
            <Col>
              <ReceivedDonationsTable />
            </Col>
          </Row> */}

      <>
      <Offcanvas show={show} onHide={handleClose} style={{width:'45dvw'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {/* <Row style={{margin:'auto', width:'35%'}} className="pb-2">
        <Button variant="primary" onClick={handleShowModal}>
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
        </Container>
    
    
      );
    };
    
    const RecipientInfoCard = ({ title, value, icon }) => {
      return (
        <div className="info-card bg-light text-center p-4">
          <i className={`bi ${icon} display-4`}></i>
          <h3 className="my-3">{value}</h3>
          <p className="text-muted">{title}</p>
        </div>
      );
    };
    
    const ReceivedDonationsTable = () => {
      const reqs = [
        {
          id: 1,
          donor: 'Jane Doe',
          // foodItem: 'Bananas',
          quantity: 10,
          deliveryDate: '2023-03-18',
        },
        // Add more dummy reqs here
      ];
    
      return (
        <>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Donor</th>
              {/* <th>Food Item</th> */}
              <th>Quantity</th>
              <th>Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            {reqs.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.donor}</td>
                {/* <td>{req.foodItem}</td> */}
                <td>{req.quantity}</td>
                <td>{req.deliveryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
   </>
  )
}

export default RecipientProfile
