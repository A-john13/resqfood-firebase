import "./deny.css";
import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../Config/firebase";
import useFirebaseCRUD from "../../Config/firebaseCRUD";
import useFirebaseChart from "../firebaseCharts";

import Home from "./home";
import About from "./about";
import Footer from "./footer";
import Contact from "./contact";
import Work from "./work";
import Testimonial from "./testimonial";

import { Doughnut,Pie,Line,Scatter,Bar, } from 'react-chartjs-2';
import { Typography, Grid, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';



const Deny1 = () => {
  const { UID, userRole } = useFirebase();
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
    labels: ['Total Donations', 'Daily Donations', 'Weekly Donations', 'Monthly Donations', 'Approved Donations', 'Rejected Donations'],
    datasets: [
      {
        label: 'Donations',
        data: [donatReport.totalDonations, donatReport.donationsMadeDaily, donatReport.donationsMadeWeekly, donatReport.donationsMadeMonthly, donatReport.approvedDonations, donatReport.rejectedDonations],
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
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: [donatReport.totalReqs, donatReport.approvedReqs, donatReport.rejectedReqs],
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


  return (
    <>

    <div className="deny">
    <div className="chart">
      <h2>Users </h2>
      <Bar data={data} options={options} />
    </div>

    <div className="chart">
      <h2>Donations </h2>
      <Bar data={data2} options={options} />
    </div>

    <div className="chart">
      <h2>Requests </h2>
      <Bar data={data3} options={options} />
    </div>

    <div className="ms-5 chart" style={{height:'50dvh'}}>
      <h2>Users </h2>
      <Doughnut data={data} options={options} />
    </div>

    <div className="chart">
      <h2>Donors vs Donations </h2>
      <Bar data={DonorDonationsdata} options={options} />
    </div>

    <div className="chart">
      <h2>Requests vs Recipients</h2>
      <Bar data={ReqsRecipsdata} options={options} />
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

    </div>
{/* 
<div className="gridCards" style={{width:'100dvh',position:'relative', top:'20',left:'10'}}>
    <Grid container spacing={2}>
  <Grid item xs={6} sm={4}>
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Donors vs Donations
        </Typography>
        <Bar data={DonorDonationsdata} options={options} />
        <Typography variant="body2" color="textSecondary" component="p">
          Total Donors: {userReport.totalDonors}<br />
          Approved: {userReport.totalApprovedDonors}<br />
          Rejected: {userReport.totalRejectedDonors}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={6} sm={4}>
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Recipients vs Requests
        </Typography>
        <Bar data={ReqsRecipsdata} options={options} />
        <Typography variant="body2" color="textSecondary" component="p">
          Total Recipients: {userReport.totalRecipients}<br />
          Approved: {userReport.totalApprovedRecipients}<br />
          Rejected: {userReport.totalRejectedRecipients}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>

</div> */}

</>
   );

};

export default Deny1;