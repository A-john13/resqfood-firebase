    
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './CSS/RecipientProfile.css'

import NavBar from '../Reusable/Nav';

const RecipientProfile = () => {



      return (
    
        <Container className="px-5 justify-content-center recipientDash" fluid>

            <>
            <NavBar></NavBar>
            </>
          <h1 className="my-4 text-center">Recipient Dashboard</h1>
    
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
    
          <Row className="my-4">
            <Col>
              <ReceivedDonationsTable />
            </Col>
          </Row>
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
