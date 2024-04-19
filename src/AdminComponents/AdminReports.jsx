import React, { useState, useEffect,useRef } from "react";
import { useFirebase } from "../Config/firebase";
import useFirebaseCRUD from "../Config/firebaseCRUD";

import Chart from 'chart.js/auto';
import { Bar,Doughnut,Pie,Line,Scatter, } from 'react-chartjs-2';
import { Typography, Grid, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './CSS/AdminReports.css'


const Reports = () => {
  const { UID, userRole } = useFirebase();
const { getDonationsReport,getUserReports,getTotalUsers } = useFirebaseCRUD();

const [donatReport, setDonatReport] = useState(null);
const [userReport,setUserReport] = useState(null);
  useEffect(() => {
    const fetchReportData = async () => {
      const donat = await getDonationsReport();
      // const users = await getUserReports();
      const users = await getTotalUsers();
      setUserReport(users);
      setDonatReport(donat);
      console.log(userReport,"twtt");
    }

    fetchReportData();
  }, []);


  //   const { fetchAllDonations,getGroupByDonorId, getGroupByDistrict} = useFirebaseCRUD();
  //   const [donations, setDonations] = useState([]);
  //   const [requests, setRequests] = useState([]);
  //   const chartRef = useRef(null);
  //   const { UID, userRole } = useFirebase();
  //   const { getDonationsReport,getTotalUsers } = useFirebaseCRUD();
    
  //   const [donatReport, setDonatReport] = useState(null);
  //   const [reqReport, setReqReport] = useState(null);
  //     useEffect(() => {
  //       const fetchReportData = async () => {
  //         const donat = await getDonationsReport();
  //         setDonatReport(donat);
  //         console.log(donatReport)
  //       }
    
  //       fetchReportData();
  //     }, [getDonationsReport,donatReport]);
    
    
  //     const [userData, setUserData] = useState(null);
    
  //     useEffect(() => {
  //       const fetchData = async () => {
  //         const data = await getTotalUsers();
  //         setUserData(data);
  //         console.log(userData,data);
  //       };
    
  //       fetchData();
  //     }, [getTotalUsers,userData]);
      
    
  //     if (!userData) {
  //       return <div>Loading...</div>;
  //     }
    
  //     const data = {
  //       labels: ['Total', 'Approved', 'Rejected'],
  //       datasets: [
  //         {
  //           label: 'users',
  //           backgroundColor: 'rgba(75,0,130, 0.4)',
  //           borderColor: 'rgba(75,0,130, 1)',
  //           borderWidth: 1,
  //           hoverBackgroundColor: 'rgba(75,0,130, 0.7)',
  //           hoverBorderColor: 'rgba(75,0,130, 1)',
  //           data: [userData.totalUsers],
  //         },
  //         // {
  //         //   label: 'Donors',
  //         //   backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //         //   borderColor: 'rgba(255, 99, 132, 1)',
  //         //   borderWidth: 1,
  //         //   hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
  //         //   hoverBorderColor: 'rgba(255, 99, 132, 1)',
  //         //   data: [userData.totalDonors, userData.totalApprovedDonors,totalRejectedDonors],
  //         // },
  //         {
  //           label: 'Recipients',
  //           backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //           borderColor: 'rgba(54, 162, 235, 1)',
  //           borderWidth: 1,
  //           hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
  //           hoverBorderColor: 'rgba(54, 162, 235, 1)',
  //           data: [userData.totalRecipients, userData.totalApprovedRecipients, userData.totalRejectedRecipients],
  //         },
  //       ],
  //     };
  //     const ReportCountdata = {
  //       labels: ['Total', 'Approved', 'Rejected'],
  //       datasets: [
  //         {
  //           label: 'Donations',
  //           backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //           borderColor: 'rgba(255, 99, 132, 1)',
  //           borderWidth: 1,
  //           hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
  //           hoverBorderColor: 'rgba(255, 99, 132, 1)',
  //           data: [donatReport.totalDonations, donatReport.approvedDonations, donatReport.rejectedDonations],
  //         },
  //         {
  //           label: 'Requests',
  //           backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //           borderColor: 'rgba(54, 162, 235, 1)',
  //           borderWidth: 1,
  //           hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
  //           hoverBorderColor: 'rgba(54, 162, 235, 1)',
  //           data: [donatReport.totalReqs,donatReport.approvedReqs,donatReport.rejectedReqs],
  //         },
  //       ],
  //     };
  //     const DonorDonationsdata = {
  //       labels: ['Total', 'Approved', 'Rejected'],
  //       datasets: [
  //         {
  //           label: 'Donors',
  //           backgroundColor: 'rgba(95, 95, 195, 0.3)',
  //           borderColor: 'rgba(95,95,195, 1)',
  //           borderWidth: 1,
  //           hoverBackgroundColor: 'rgba(95, 95, 195, 0.7)',
  //           hoverBorderColor: 'rgba(54, 162, 235, 1)',
  //           data: [userData.totalDonors,userData.totalApprovedDonors,userData.totalRejectedDonors],
  //         },
  //         {
  //           label: 'Donations',
  //           backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //           borderColor: 'rgba(255, 99, 132, 1)',
  //           borderWidth: 1,
  //           hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
  //           hoverBorderColor: 'rgba(255, 99, 132, 1)',
  //           data: [donatReport.totalDonations, donatReport.approvedDonations, donatReport.rejectedDonations],
  //         },
  //       ],
  //     };
  //     const ReqsRecipsdata = {
  //       labels: ['Total', 'Approved', 'Rejected'],
  //       datasets: [
  //         {
  //           label: 'Recipients',
  //           backgroundColor: 'rgba(155,155,55, 0.3)',
  //           borderColor: 'rgba(155,155,55, 1)',
  //           borderWidth: 1,
  //           hoverBackgroundColor: 'rgba(155,155,55, 0.7)',
  //           hoverBorderColor: 'rgba(155,155,55, 1)',
  //           data: [userData.totalRecipients,userData.totalApprovedRecipients,userData.totalRejectedRecipients],
  //         },
  //         {
  //           label: 'Requests',
  //           backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //           borderColor: 'rgba(255, 99, 132, 1)',
  //           borderWidth: 1,
  //           hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
  //           hoverBorderColor: 'rgba(255, 99, 132, 1)',
  //           data: [donatReport.totalReqs, donatReport.approvedReqs, donatReport.rejectedReqs],
  //         },
  //       ],
  //     };
    
  //     if (!userData) {
  //       return <div>Loading...</div>;
  //     }
  //     const reportStyle = {
  //       backgroundColor: '#f9f9f9',
  //       padding: '20px',
  //       borderRadius: '5px',
  //       boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  //       margin: '20px 0',
  //     };
  //     const iconStyle = {
  //       marginRight: '5px',
  //     };
      
     
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const fetchedDonations = await fetchAllDonations();
  //       setDonations(fetchedDonations);
  
  //       // const fetchedRequests = await fetchAllReqs();
  //       // setRequests(fetchedRequests);
  //     };
  
  //     fetchData();
  //   }, [,]);
  
  //   useEffect(() => {
    
  
  //     const donationData = donations.length;
  //     const requestData = requests.length;
  
  //     const data = {
  //       labels: ["Donations", "Requests"],
  //       datasets: [
  //         {
  //           label: "Number of Donations and Requests",
  //           backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
  //           borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
  //           borderWidth: 1,
  //           hoverBackgroundColor: ["rgba(255, 99, 132, 0.4)", "rgba(54, 162, 235, 0.4)"],
  //           hoverBorderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
  //           data: [donationData, requestData],
  //         },
  //       ],
  //     };
  
  //     const ctx = document.getElementById("myChart").getContext("2d");
  //     chartRef.current = new Chart(ctx, {
  //       type: "polarArea",
  //       data: data,
  //       options: {
  //         responsive: true,
  //         maintainAspectRatio: true,
  //       },
  //     });
  
  //     return () => {
  //       if (chartRef.current) {
  //         chartRef.current.destroy(); 
  //       }
  //     };
  //   }, [donations, requests]);


  //   const [donationsByDonorId, setDonationsByDonorId] = useState([]);
  // const [donationsByDistrict, setDonationsByDistrict] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const donorIdData = await getGroupByDonorId();
  //     const districtData = await getGroupByDistrict();

  //     setDonationsByDonorId(donorIdData);
  //     setDonationsByDistrict(districtData);
  //   };

  //   fetchData();
  // }, []);
  
  // console.log(donationsByDistrict);
  // console.log(donationsByDonorId);
    return (
      <div className="adminReportBox" style={{background:'whitesmoke'}}>

        <h2>Donation Report</h2>
  {donatReport && (
    <>
    <div>
      <p><FaCalendarDay className='iconStyle' />Total Donations: {donatReport.totalDonations}</p>
      <p><FaCalendarDay className='iconStyle'  />Donations Made Today: {donatReport.donationsMadeDaily}</p>
      <p><FaCalendarWeek className='iconStyle'  />Donations Made This Week: {donatReport.donationsMadeWeekly}</p>
      <p><FaCalendarAlt className='iconStyle'  />Donations Made This Month: {donatReport.donationsMadeMonthly}</p>
      <p><FaCheckCircle className='iconStyle'  />Approved Donations: {donatReport.approvedDonations}</p>
      <p><FaTimesCircle className='iconStyle'  />Rejected Donations: {donatReport.rejectedDonations}</p>
    </div>
 <h2>Request Report</h2>
    <div>
      <p><FaCalendarDay className='iconStyle'  />Total Requests: {donatReport.totalReqs}</p>
      <p><FaCalendarDay className='iconStyle'  />Requests Made Today: {donatReport.reqsMadeDaily}</p>
      <p><FaCalendarWeek className='iconStyle'  />Requests Made This Week: {donatReport.reqsMadeWeekly}</p>
      <p><FaCalendarAlt className='iconStyle'  />Requests Made This Month: {donatReport.reqsMadeMonthly}</p>
      <p><FaCheckCircle className='iconStyle'  />Approved Requests: {donatReport.approvedReqs}</p>
      <p><FaTimesCircle className='iconStyle'  />Rejected Requests: {donatReport.rejectedReqs}</p>
      <h4>Ratio of Donation against Requests on Monthly scale: {donatReport.ratioMonthly}</h4>
    </div>
    </>
  )}

          <Grid item xs={6} sm={4} container spacing={2} className="py-3">
            <Card>
              <CardHeader
                avatar={
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                }
                title="Total Donations"
                subheader={donatReport.totalDonations}/>
              <CardContent style={{background:'grey'}}>
              <Typography variant="body2" color="textWarning" component="p">
              Donations Made Today: {donatReport.donationsMadeDaily}
              <br />
                </Typography>
                <br />
                <Typography variant="body2" color="textSecondary" component="p">
              Donations Made Weekly: {donatReport.donationsMadeWeekly}
            </Typography>
                <br />
                <Typography variant="body2" color="textSecondary" component="p">
              Donations Made Monthly: {donatReport.donationsMadeMonthly}
            </Typography>
                <br />
                <Typography variant="body2" color="textSecondary" component="p">
              Approved Donations: {donatReport.approvedDonations}
            </Typography>
                <br />
                <Typography variant="body2" color="textSecondary" component="p">
              To be Approved Donations: {donatReport.rejectedDonations}
            </Typography>
              </CardContent>
              </Card>
          </Grid>


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
                subheader={userReport[0]}
              />
              <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                  Donors: {userReport[1]}
              <br />
                   To be approved: {userReport[2]}
                </Typography>
                <br />
                <Typography variant="body2" color="textSecondary" component="p">
              Ratio of Recipients to Donors: {userReport[7]}
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
                subheader={userReport[1]}
              />
              <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                  Approved: {userReport[2]}
                 <br />
                 To be Approved: {userReport[3]}
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
                subheader={userReport[4]}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Approved: {userReport[5]}
                  <br />
                   Rejected: {userReport[6]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
    </Grid>

    
        {/* <h2>Donation Report</h2>
        <div className="numberIcons d-flex" style={{width:'80dvw'}}>
  {donatReport && (
    <>
    <div>
      <p><FaCalendarDay style={iconStyle} />Total Donations: {donatReport.totalDonations}</p>
      <p><FaCalendarDay style={iconStyle} />Donations Made Today: {donatReport.donationsMadeDaily}</p>
      <p><FaCalendarWeek style={iconStyle} />Donations Made This Week: {donatReport.donationsMadeWeekly}</p>
      <p><FaCalendarAlt style={iconStyle} />Donations Made This Month: {donatReport.donationsMadeMonthly}</p>
      <p><FaCheckCircle style={{ ...iconStyle, color: 'blue' }} />Approved Donations: {donatReport.approvedDonations}</p>
      <p><FaTimesCircle style={{ ...iconStyle, color: 'red' }} />Rejected Donations: {donatReport.rejectedDonations}</p>
    </div>
 <h2>Requset Report</h2> */}
    {/* <div>
      <p><FaCalendarDay style={iconStyle} />Total Requests: {donatReport.totalReqs}</p>
      <p><FaCalendarDay style={iconStyle} />Requests Made Today: {donatReport.reqsMadeDaily}</p>
      <p><FaCalendarWeek style={iconStyle} />Requests Made This Week: {donatReport.reqsMadeWeekly}</p>
      <p><FaCalendarAlt style={iconStyle} />Requests Made This Month: {donatReport.reqsMadeMonthly}</p>
      <p><FaCheckCircle style={{ ...iconStyle, color: 'blue' }} />Approved Requests: {donatReport.approvedReqs}</p>
      <p><FaTimesCircle style={{ ...iconStyle, color: 'red' }} />Rejected Requests: {donatReport.rejectedReqs}</p>
      <h4>Ratio of Donation against Requests on Monthly scale: {donatReport.ratioMonthly}</h4>
    </div>
    </>
  )} */}



     {/* <div className="App">
      <Home />
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div> */}

{/* <Grid container spacing={2}>
      {userData && (
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
                subheader={userData[0]}
              />
              <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                  Donors: {userData[1]}
              <br />
                   To be approved: {userData[2]}
                </Typography>
                <br />
                <Typography variant="body2" color="textSecondary" component="p">
              Ratio of Recipients to Donors: {userData[7]}
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
                subheader={userData[1]}
              />
              <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                  Approved: {userData[2]}
                 <br />
                 To be Approved: {userData[3]}
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
                subheader={userData[4]}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Approved: {userData[5]}
                  <br />
                   Rejected: {userData[6]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
    </div> */}

    {/* <div>
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
        </div> */}

{/* 
      <div className="reports" >
        <canvas id="myChart"></canvas>


        <div>
      <h2>Donation Reports</h2>
      <h3>Donations by Donor ID</h3>
      <ul>
        {donationsByDonorId.map((donation,index) => (
          <li key={index}>
            Donor ID: {donation.donorName}, Count: {donation.count}
          </li>
        ))}
      </ul>
      <h3>Donations by District</h3>
      <ul>
        {donationsByDistrict.map((donation) => (
          <li key={donation.district}>
            District: {donation.district}, Count: {donation.count}
          </li>
        ))}
      </ul>
    </div>

      </div> */}
  </div>
    );
  };
  
  export default Reports;