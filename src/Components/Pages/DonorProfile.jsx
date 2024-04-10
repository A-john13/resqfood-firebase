import React,{useEffect,useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useFirebaseCRUD from '../../Config/firebaseCRUD';
import { useFirebase } from '../../Config/firebase';
import NavBar from '../Reusable/Nav'

import './CSS/DonorProfile.css'

const DonorProfile = ( { title, value, icon } ) => {

    const firebase = useFirebase();
    const {UID} = useFirebase();
    const { getDonatData } = useFirebaseCRUD();
    const [totalDonations, setTotalDonations] = useState(0);
    const [upcomingDonations, setUpcomingDonations] = useState(0);
    const [pastDonations, setPastDonations] = useState(0);

    useEffect(() => {
    getDonatData(UID)
    .then(userData => {
        if (userData) {
        console.log('User data:', userData);
        const total = userData.length;
          const upcoming = userData.filter(donation => donation.adminVerify && donation.status === 0).length;
          const past = userData.filter(donation => donation.adminVerify && donation.status === 1).length;
          setTotalDonations(total);
          setUpcomingDonations(upcoming);
          setPastDonations(past);
        console.log('Total Donations:', totalDonations);
        console.log('Upcoming Donations:', upcomingDonations);
        console.log('Past Donations:', pastDonations);
        }
    }).catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [UID, getDonatData]);
      return (

        <div className="px-5 donorDash">

            <>
            <NavBar></NavBar>
            </>
   
        <h1 className="py-4 text-center">Donor Dashboard</h1>
        <h4>Email: {firebase.user ? firebase.user.email : 'Not logged in'}</h4>
        <Row>
          <Col md={4} xs={12}>
            <DonorInfoCard
              title="Total Donations"
              value={totalDonations}
              icon="bi-currency-dollar"
            />
          </Col>
  
          <Col md={4} xs={12}>
            <DonorInfoCard
              title="Upcoming Donations"
              value={upcomingDonations}
              icon="bi-calendar-event"
            />
          </Col>
  
          <Col md={4} xs={12}>
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
  
  const DonationHistoryTable = ( {donations} ) => {
  
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
   

export default DonorProfile
