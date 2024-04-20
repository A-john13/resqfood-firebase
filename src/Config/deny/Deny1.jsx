// import "./deny.css";
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
const { getDonationsReport,getTotalUsers,listenTotalUsers } = useFirebaseCRUD();
const {listenDonationsReport} = useFirebaseChart();

const [donatReport, setDonatReport] = useState(null);
const [userReport,setUserReport] = useState(null);
  useEffect(() => {
    const fetchReportData = async () => {
      const donat = await getDonationsReport();
      // const users = await getUserReports();
      const users = await getTotalUsers();
      if(users){

        setUserReport(users);
        setDonatReport(donat);
        console.log({userReport},"twtt");
        // console.log(totalUsers,totalDonors,totalRecipients,"et");
      }
    }

    fetchReportData();
  }, []);


  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = listenTotalUsers((userData) => {
      setUserData(userData);
      console.log(userData,"ueerdat")
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const [data2, setData2] = useState(null);

  useEffect(() => {
    const unsubscribe = listenDonationsReport((data2) => {
      setData2(data2);
      console.log(data2,"data2")
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }
  
  const data = {
    labels: ['Total Users', 'Total Donors', 'Total Recipients'],
    datasets: [
      {
        label: 'Users',
        data: [userData.totalUsers, userData.totalDonors, userData.totalRecipients],
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

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const dataGraph = {
    labels: ['Total Users', 'Total Donors', 'Total Recipients','Total Users', 'Total Donors', 'Total Recipients'],
    datasets: [
      {
        label: 'Users',
        data: [data2.totalDonations, data2.totalDonations,data2.donationsMadeDaily, data2.donationsMadeWeekly,data2.donationsMadeMonthly,data2.approvedDonations,data2.rejectedDonations],
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




  // const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getTotalUsers();
  //     setUserData(data);
  //     console.log(userData);
  //   };

  //   fetchData();
  // }, []);


//   const data1 = {
//     labels: ['Total', 'Approved', 'Rejected'],
//     datasets: [
//       {
//         label: 'users',
//         backgroundColor: 'rgba(75,0,130, 0.4)',
//         borderColor: 'rgba(75,0,130, 1)',
//         borderWidth: 1,
//         hoverBackgroundColor: 'rgba(75,0,130, 0.7)',
//         hoverBorderColor: 'rgba(75,0,130, 1)',
//         data: [totalUsers],
//       },
//       {
//         label: 'Donors',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//         hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
//         hoverBorderColor: 'rgba(255, 99, 132, 1)',
//         data: [userData.totalDonors, userData.totalApprovedDonors, userData.totalRejectedDonors],
//       },
//       {
//         label: 'Recipients',
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//         hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
//         hoverBorderColor: 'rgba(54, 162, 235, 1)',
//         data: [userData.totalRecipients, userData.totalApprovedRecipients, userData.totalRejectedRecipients],
//       },
//     ],
//   };
//   const ReportCountdata = {
//     labels: ['Total', 'Approved', 'Rejected'],
//     datasets: [
//       {
//         label: 'Donations',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//         hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
//         hoverBorderColor: 'rgba(255, 99, 132, 1)',
//         data: [donatReport.totalDonations, donatReport.approvedDonations, donatReport.rejectedDonations],
//       },
//       {
//         label: 'Requests',
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//         hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
//         hoverBorderColor: 'rgba(54, 162, 235, 1)',
//         data: [donatReport.totalReqs,donatReport.approvedReqs,donatReport.rejectedReqs],
//       },
//     ],
//   };
//   const DonorDonationsdata = {
//     labels: ['Total', 'Approved', 'Rejected'],
//     datasets: [
//       {
//         label: 'Donors',
//         backgroundColor: 'rgba(95, 95, 195, 0.3)',
//         borderColor: 'rgba(95,95,195, 1)',
//         borderWidth: 1,
//         hoverBackgroundColor: 'rgba(95, 95, 195, 0.7)',
//         hoverBorderColor: 'rgba(54, 162, 235, 1)',
//         data: [userData.totalDonors, userData.totalApprovedDonors, userData.totalRejectedDonors],
//       },
//       {
//         label: 'Donations',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//         hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
//         hoverBorderColor: 'rgba(255, 99, 132, 1)',
//         data: [donatReport.totalDonations, donatReport.approvedDonations, donatReport.rejectedDonations],
//       },
//     ],
//   };
//   const ReqsRecipsdata = {
//     labels: ['Total', 'Approved', 'Rejected'],
//     datasets: [
//       {
//         label: 'Recipients',
//         backgroundColor: 'rgba(155,155,55, 0.3)',
//         borderColor: 'rgba(155,155,55, 1)',
//         borderWidth: 1,
//         hoverBackgroundColor: 'rgba(155,155,55, 0.7)',
//         hoverBorderColor: 'rgba(155,155,55, 1)',
//         data: [userData.totalRecipients, userData.totalApprovedRecipients, userData.totalRejectedRecipients],
//       },
//       {
//         label: 'Requests',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//         hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
//         hoverBorderColor: 'rgba(255, 99, 132, 1)',
//         data: [donatReport.totalReqs, donatReport.approvedReqs, donatReport.rejectedReqs],
//       },
//     ],
// }



  
 
  return (
    <div >

<div>
      <h2>Users Chart</h2>
      <Bar data={data} options={options} />
    </div>

<div> 
      <h2></h2>
      <Bar data={dataGraph} options={options} />
     <strong>strog{
        data2.totalDonations
      }
      </strong> 
     <strong>strog{
        data2.donationsMadeWeekly}
      </strong> 
     <strong>strog{
        data2.donationsMadeMonthly
      }
      </strong> 
     <strong>strog{
        data2.approvedDonations
      }
      </strong> 
     <strong>strog{
        data2.rejectedDonations
      }
      </strong> 
    </div>
{/* <div>
      <p>Total Users: {userData.totalUsers}</p>
      <p>Total Donors: {userData.totalDonors}</p>
      <p>Total Approved Donors: {userData.totalApprovedDonors}</p>
      <p>Total Rejected Donors: {userData.totalRejectedDonors}</p>
      <p>Total Recipients: {userData.totalRecipients}</p>
      <p>Total Approved Recipients: {userData.totalApprovedRecipients}</p>
      <p>Total Rejected Recipients: {userData.totalRejectedRecipients}</p>
      <p>Ratio: {userData.ratio}</p>
    </div>
  */}
    <>
    

    {/* <div>
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
    </div> */}
 </>

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