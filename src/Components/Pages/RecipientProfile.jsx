    
import React from 'react';
import { Container, Row, Col,Accordion,FloatingLabel,Form } from 'react-bootstrap';
import './CSS/RecipientProfile.css'
import useFirebaseCRUD from '../../Config/firebaseCRUD';
import { useFirebase } from '../../Config/firebase';
import NavBar from '../Reusable/Nav';

const RecipientProfile = () => {
  const firebase = useFirebase();
  const { UID } = useFirebase();
  const { getDonatData, userData } = useFirebaseCRUD();


      return (
    
        <Container className="px-5 justify-content-center recipientDash" fluid>

            <>
            <NavBar></NavBar>
            </>
          <h1 className="my-4 text-center">Recipient Dashboard</h1>
      <div className="d-flex left">
        <div className="profile" style={{ width: "50dvw" }}>
          <Row>
            <Col md={4} xs={12}>
              <RecipientInfoCard
                title="Total Donations Received"
                value={8}
                icon="bi-basket-fill"
              />
            </Col>
    
            <Col md={4} xs={12}>
              <RecipientInfoCard
                title="Upcoming Donations"
                value={2}
                icon="bi-calendar-event"
              />
            </Col>
    
            <Col md={4} xs={12}>
              <RecipientInfoCard
                title="Past Donations"
                value={6}
                icon="bi-calendar-x"
              />
            </Col>
          </Row>
    
          {/* <Row className="my-4">
            <Col>
              <ReceivedDonationsTable />
            </Col>
          </Row> */}


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
                <img src={userData.proof} alt="" style={{height:'200px',width:"90%"}}/>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
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
      const donations = [
        {
          id: 1,
          donor: 'Jane Doe',
          // foodItem: 'Bananas',
          quantity: 10,
          deliveryDate: '2023-03-18',
        },
        // Add more dummy donations here
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
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.id}</td>
                <td>{donation.donor}</td>
                {/* <td>{donation.foodItem}</td> */}
                <td>{donation.quantity}</td>
                <td>{donation.deliveryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
   </>
  )
}

export default RecipientProfile
