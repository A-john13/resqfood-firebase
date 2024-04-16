import "./deny.css";
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

import { Typography, Grid, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Deny1 = () => {
  const { UID, userRole } = useFirebase();
const { getDonationsReport, getReqsReport,getUserReports,getTotalUsers } = useFirebaseCRUD();

const [donatReport, setDonatReport] = useState(null);
const [reqReport, setReqReport] = useState(null);
const [userReport,setUserReport] = useState(null);
  useEffect(() => {
    const fetchReportData = async () => {
      const donat = await getDonationsReport();
      const req = await getReqsReport();
      // const users = await getUserReports();
      const users = await getTotalUsers();
      setUserReport(users);
      setReqReport(req)
      setDonatReport(donat);
      // console.log(users.data);
    };

    fetchReportData();
  }, []);

  const reportStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    margin: '20px 0',
  };
  const iconStyle = {
    marginRight: '5px',
  };
  
 
  return (
    <div >
 <h2>Donation Report</h2>
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
 <h2>Requset Report</h2>
    <div>
      <p><FaCalendarDay style={iconStyle} />Total Requests: {donatReport.totalReqs}</p>
      <p><FaCalendarDay style={iconStyle} />Requests Made Today: {donatReport.reqsMadeDaily}</p>
      <p><FaCalendarWeek style={iconStyle} />Requests Made This Week: {donatReport.reqsMadeWeekly}</p>
      <p><FaCalendarAlt style={iconStyle} />Requests Made This Month: {donatReport.reqsMadeMonthly}</p>
      <p><FaCheckCircle style={{ ...iconStyle, color: 'blue' }} />Approved Requests: {donatReport.approvedReqs}</p>
      <p><FaTimesCircle style={{ ...iconStyle, color: 'red' }} />Rejected Requests: {donatReport.rejectedReqs}</p>
      <h4>Ratio of Donation against Requests on Monthly scale: {donatReport.ratioMonthly}</h4>
    </div>
    </>
  )}

     {/* <div className="App">
      <Home />
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div> */}

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

    </div>
  );
};

export default Deny1;
