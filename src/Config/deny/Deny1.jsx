import "./deny.css";
import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../Config/firebase";
import useFirebaseCRUD from "../../Config/firebaseCRUD";
import useFirebaseChart from "../firebaseCharts";
import  Row from "react-bootstrap/Row";
import Toast from 'react-bootstrap/Toast';
import  Card  from "react-bootstrap/Card";
import Home from "./home";
import About from "./about";
import Footer from "./footer";
import Contact from "./contact";
import Work from "./work";
import Testimonial from "./testimonial";

import { Doughnut,Pie,Line,Scatter,Bar, } from 'react-chartjs-2';
// import { Typography, Grid, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';



const Deny1 = () => {
  const { UID, userRole } = useFirebase();
  const nav =useNavigate();
  const { listenTotalUsers } = useFirebaseCRUD();
  const { listenDonationsReport, listenReqsReport } = useFirebaseChart();

  const [donatReport, setDonatReport] = useState(null);
  const [userReport, setUserReport] = useState(null);
  const [reqsReport, setReqsReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const donationsReportUnsubscribe = listenDonationsReport((report) => {
        setDonatReport(report);
      });

      const reqsReportUnsubscribe = listenReqsReport((report) => {
        setReqsReport(report);
      });

      const totalUsersUnsubscribe = listenTotalUsers((userData) => {
        setUserReport(userData);
      });

      return () => {
        donationsReportUnsubscribe();
        reqsReportUnsubscribe();
        totalUsersUnsubscribe();
      };
    };

    fetchData();
  }, []);

  
  if (!donatReport || !userReport || !reqsReport) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: ['Total Users', 'Total Donors', 'Total Recipients'],
    datasets: [
      {
        label: 'Users',
        data: [userReport.totalUsers, userReport.totalDonors, userReport.totalRecipients],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const data2 = {
    labels: ['Total Donations', 'Daily Donations', 'Weekly Donations', 'Monthly Donations'],
    datasets: [
      {
        label: 'Donations',
        data: [donatReport.totalDonations, donatReport.donationsMadeDaily, donatReport.donationsMadeWeekly, donatReport.donationsMadeMonthly,],
        backgroundColor: [
          'rgba(75,0,130, 0.4)',
          'rgba(54, 12, 55, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(55, 106, 26, 0.2)',
          'rgba(25, 6, 236, 0.2)',
          'rgba(2, 166, 26, 0.2)',
        ],
        borderColor: [
          'rgba(75,0,130, 1)',
          'rgba(54, 12, 55, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(55, 106, 26, 1)',
          'rgba(25, 6, 236, 1)',
          'rgba(2, 166, 26, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const data3 = {
    labels: ['Total Requests', 'Daily Requests', 'Weekly Requests', 'Monthly Requests', 'Approved Requests', 'Rejected Requests'],
    datasets: [
      {
        label: 'Requests',
        data: [reqsReport.totalReqs, reqsReport.reqsMadeDaily, reqsReport.reqsMadeWeekly, 
          reqsReport.reqsMadeMonthly, reqsReport.approvedReqs, reqsReport.rejectedReqs],
          backgroundColor: [
            'rgba(175,0,10, 0.4)',
            'rgba(45, 12, 55, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(55, 106, 26, 0.2)',
            'rgba(25, 6, 236, 0.2)',
            'rgba(255, 16, 2, 0.2)',
          ],
          borderColor: [
            'rgba(175,0,10, 1)',
            'rgba(45, 12, 55, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(55, 106, 26, 1)',
            'rgba(25, 6, 236, 1)',
            'rgba(255, 16, 2, 1)',
          ],
        borderWidth: 1,
      },
    ],
  };
  

  // mix cahrts
  const DonorDonationsdata = {
    labels: ['Total', 'Approved', 'Rejected'],
    datasets: [
      {
        label: 'Donors',
        backgroundColor: 'rgba(95, 95, 195, 0.3)',
        borderColor: 'rgba(95,95,195, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(95, 95, 195, 0.7)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: [userReport.totalDonors, userReport.totalApprovedDonors, userReport.totalRejectedDonors],
      },
      {
        label: 'Donations',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: [donatReport.totalDonations, donatReport.approvedDonations, donatReport.rejectedDonations],
      },
    ],
  };
  
  const ReqsRecipsdata = {
    labels: ['Total', 'Approved', 'Rejected'],
    datasets: [
      {
        label: 'Recipients',
        backgroundColor: 'rgba(155,155,55, 0.3)',
        borderColor: 'rgba(155,155,55, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(155,155,55, 0.7)',
        hoverBorderColor: 'rgba(155,155,55, 1)',
        data: [userReport.totalRecipients, userReport.totalApprovedRecipients, userReport.totalRejectedRecipients],
      },
      {
        label: 'Requests',
        backgroundColor: 'rgba(55, 1, 132, 0.2)',
        borderColor: 'rgba(55, 1, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(55, 1, 132, 0.4)',
        hoverBorderColor: 'rgba(55, 1, 132, 1)',
        data: [reqsReport.totalReqs, reqsReport.approvedReqs, reqsReport.rejectedReqs],
      },
    ],
  };
  
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const navigator =()=>{
    nav('/user/role/adminDash');
  }

  return (
    <>
    {/* <Row style={{height:'max-content',width:'100dnvw'}}>
      <Button  onClick={navigator}>Home</Button>
      <h1>Reports</h1>
      </Row> */}
    <div className="deny">
     
    <div className="place-content-center chart">
      <h2>Users </h2>
      <Bar data={data} options={options} />

      <Toast style={{background:'inherit'}}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Reports</strong>
      </Toast.Header>
      <Toast.Body>
      Total Donors: {userReport.totalDonors}<br />
          Approved: {userReport.totalApprovedDonors}<br />
          Rejected: {userReport.totalRejectedDonors}
      </Toast.Body>
    </Toast>
    </div>

    <div className="chart">
      <h2>Donations </h2>
      <Bar data={data2} options={options} />

      <Toast style={{background:'inherit'}}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Reports</strong>
      </Toast.Header>
      <Toast.Body>
      Total Donations : {donatReport.totalDonations}<br />
      Donations Made today : {donatReport.donationsMadeDaily}<br />
      This Weeks Donations: {donatReport.donationsMadeWeekly}<br />
      Monthly Donations : {donatReport.donationsMadeMonthly}
      </Toast.Body>
    </Toast>
    </div>

    <div className="chart">
      <h2>Requests </h2>
      <Bar data={data3} options={options} />
      <Toast style={{background:'inherit'}}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Reports</strong>
      </Toast.Header>
      <Toast.Body>
      Total Donations : {reqsReport.totalReqs}<br />
      Donations Made today : {reqsReport.reqsMadeDaily}<br />
      This Weeks Donations: {reqsReport.reqsMadeWeekly}<br />
      Monthly Donations : {reqsReport.reqsMadeMonthly}
      </Toast.Body>
      </Toast>
    </div>

    {/* <div className="ms-5 chart" style={{height:'50dvh'}}>
      <h2>Users </h2>
      <Doughnut data={data} options={options} />
    </div> */}

    <div className="chart">
      <h2>Donors vs Donations </h2>
      <Bar data={DonorDonationsdata} options={options} />
      <div className="d-flex justify-content-center">
      <Toast style={{background:'inherit'}}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Reports</strong>
      </Toast.Header>
      <Toast.Body>
      Total Users : {userReport.totalUsers}<br />
      Total Donors : {userReport.totalDonors}<br />
      Approved Donors : {userReport.totalApprovedDonors}<br />
      To be approved : {userReport.totalRejectedDonors}
      </Toast.Body>
      </Toast>
      </div>
    </div>

    <div className="chart">
      <h2>Requests vs Recipients</h2>
      <Bar data={ReqsRecipsdata} options={options} />
      <Toast style={{background:'inherit'}}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Reports</strong>
      </Toast.Header>
      <Toast.Body>
      Total Users : {userReport.totalUsers}<br />
     Total Recipients: {userReport.totalRecipients}<br />
      Approved Recipients : {userReport.totalApprovedRecipients}<br />
      To be approved : {userReport.totalRejectedRecipients}
      </Toast.Body>
      </Toast>
    </div>

   
   

{/* 
    <div className="chart">
      <h2>Donations  </h2>
      <Line data={data2} options={options} />
    </div>

    <div className="chart">
      <h2>Requests</h2>
      <Scatter data={data3} options={options} />
    </div> */}



{/* 
<div className="gridCards" style={{display:'block',width:'100dvw',}}>
  <Alert>
    <Card>
          Donors vs Donations
        <Card.Body>
          Total Donors: {userReport.totalDonors}<br />
          Approved: {userReport.totalApprovedDonors}<br />
          Rejected: {userReport.totalRejectedDonors}
        </Card.Body>
    </Card>
    <Card>
      <Card.Body>
          Recipients vs Requests
          Total Recipients: {userReport.totalRecipients}<br />
          Approved: {userReport.totalApprovedRecipients}<br />
          Rejected: {userReport.totalRejectedRecipients}
        </Card.Body>
      
    </Card>

</Alert>
</div> */}
    </div>


</>
   );

};

export default Deny1;