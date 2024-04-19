// import "./deny.css";
import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../Config/firebase";
import useFirebaseCRUD from "../../Config/firebaseCRUD";

import Home from "./home";
import About from "./about";
import Footer from "./footer";
import Contact from "./contact";
import Work from "./work";
import Testimonial from "./testimonial";

import { Bar,Doughnut,Pie,Line,Scatter, } from 'react-chartjs-2';
import { Typography, Grid, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Deny1 = () => {
  const { UID, userRole } = useFirebase();
const { getDonationsReport,getUserReports,getTotalUsers } = useFirebaseCRUD();

const [donatReport, setDonatReport] = useState(null);
const [userReport,setUserReport] = useState(null);
var totalUsers = null;
var totalDonors = null;
var totalRecipients = null;
  useEffect(() => {
    const fetchReportData = async () => {
      const donat = await getDonationsReport();
      // const users = await getUserReports();
      const users = await getTotalUsers();
      totalUsers=users[0];
      if(users){

        setUserReport(users);
        setDonatReport(donat);
        console.log({userReport},"twtt");
        // console.log(totalUsers,totalDonors,totalRecipients,"et");
      }
    }

    fetchReportData();
  }, []);



  // const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getTotalUsers();
  //     setUserData(data);
  //     console.log(userData);
  //   };

  //   fetchData();
  // }, []);


  // const data = {
  //   labels: ['Total', 'Approved', 'Rejected'],
  //   datasets: [
  //     {
  //       label: 'users',
  //       backgroundColor: 'rgba(75,0,130, 0.4)',
  //       borderColor: 'rgba(75,0,130, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(75,0,130, 0.7)',
  //       hoverBorderColor: 'rgba(75,0,130, 1)',
  //       data: [totalUsers],
  //     },
  //     {
  //       label: 'Donors',
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       borderColor: 'rgba(255, 99, 132, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
  //       hoverBorderColor: 'rgba(255, 99, 132, 1)',
  //       data: [userReport.totalDonors, userReport.totalApprovedDonors, userReport.totalRejectedDonors],
  //     },
  //     {
  //       label: 'Recipients',
  //       backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //       borderColor: 'rgba(54, 162, 235, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
  //       hoverBorderColor: 'rgba(54, 162, 235, 1)',
  //       data: [userReport.totalRecipients, userReport.totalApprovedRecipients, userReport.totalRejectedRecipients],
  //     },
  //   ],
  // };
  // const ReportCountdata = {
  //   labels: ['Total', 'Approved', 'Rejected'],
  //   datasets: [
  //     {
  //       label: 'Donations',
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       borderColor: 'rgba(255, 99, 132, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
  //       hoverBorderColor: 'rgba(255, 99, 132, 1)',
  //       data: [donatReport.totalDonations, donatReport.approvedDonations, donatReport.rejectedDonations],
  //     },
  //     {
  //       label: 'Requests',
  //       backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //       borderColor: 'rgba(54, 162, 235, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
  //       hoverBorderColor: 'rgba(54, 162, 235, 1)',
  //       data: [donatReport.totalReqs,donatReport.approvedReqs,donatReport.rejectedReqs],
  //     },
  //   ],
  // };
  // const DonorDonationsdata = {
  //   labels: ['Total', 'Approved', 'Rejected'],
  //   datasets: [
  //     {
  //       label: 'Donors',
  //       backgroundColor: 'rgba(95, 95, 195, 0.3)',
  //       borderColor: 'rgba(95,95,195, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(95, 95, 195, 0.7)',
  //       hoverBorderColor: 'rgba(54, 162, 235, 1)',
  //       data: [userReport.totalDonors, userReport.totalApprovedDonors, userReport.totalRejectedDonors],
  //     },
  //     {
  //       label: 'Donations',
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       borderColor: 'rgba(255, 99, 132, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
  //       hoverBorderColor: 'rgba(255, 99, 132, 1)',
  //       data: [donatReport.totalDonations, donatReport.approvedDonations, donatReport.rejectedDonations],
  //     },
  //   ],
  // };
  // const ReqsRecipsdata = {
  //   labels: ['Total', 'Approved', 'Rejected'],
  //   datasets: [
  //     {
  //       label: 'Recipients',
  //       backgroundColor: 'rgba(155,155,55, 0.3)',
  //       borderColor: 'rgba(155,155,55, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(155,155,55, 0.7)',
  //       hoverBorderColor: 'rgba(155,155,55, 1)',
  //       data: [userReport.totalRecipients, userReport.totalApprovedRecipients, userReport.totalRejectedRecipients],
  //     },
  //     {
  //       label: 'Requests',
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       borderColor: 'rgba(255, 99, 132, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
  //       hoverBorderColor: 'rgba(255, 99, 132, 1)',
  //       data: [donatReport.totalReqs, donatReport.approvedReqs, donatReport.rejectedReqs],
  //     },
  //   ],


  
 
  return (
    <div >

  { userReport === !null && (
    <>
    <div> 
      <h2>Donations vs Requests</h2>
      <Bar data={data} />
    </div>

    <div>
      <h2>Donors vs Recipients</h2>
      <Bar data={ReportCountdata} />
    </div>
    <div>
      <h2>Donors vs Donations</h2>
      <Bar data={DonorDonationsdata} />
    </div>
    <div>
      <h2>Recipients vs Requests</h2>
      <Bar data={ReqsRecipsdata} />
    </div>
 </>
   ) }

{userReport && 
( <h1> To be approved: {userReport.totalRejectedDonors}</h1> )
}
<Grid container spacing={2}>
      {userReport && (
        <>
          <Grid item xs={6} sm={4}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                }
                title="Total Users"
                subheader={userReport.totalUsers}
              />
              <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                  Donors: {userReport.totalDonors}
              <br />
                   To be approved: {userReport.totalRejectedDonors}
                </Typography>
                <br />
                <Typography variant="body2" color="textSecondary" component="p">
              Ratio of Recipients to Donors: {userReport.ratio}
            </Typography>
              </CardContent>
              </Card>
              </Grid>
              <Grid item xs={6} sm={4}>
              <Card>
              <CardHeader
                avatar={
                  <Avatar>
                    <GroupIcon />
                  </Avatar>
                }
                title="Total Donors"
                subheader={userReport.totalDonors}
              />
              <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                  Approved: {userReport.totalApprovedDonors}
                 <br />
                 To be Approved: {userReport.totalRejectedDonors}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar>
                    <GroupIcon />
                  </Avatar>
                }
                title="Total Recipients"
                subheader={userReport.totalRecipients}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Approved: {userReport.totalApprovedRecipients}
                  <br />
                   Rejected: {userReport.totalRejectedRecipients}
                </Typography>
              </CardContent>
            </Card>
          </Grid> 
        </>
      )}
    </Grid>

    </div>
  );
};

export default Deny1;



{/* <div className="App">
<Home />
<About />
<Work />
<Testimonial />
<Contact />
<Footer />
</div> */}