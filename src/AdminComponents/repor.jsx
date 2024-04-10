

//repor.jsx:98 Uncaught ReferenceError: donationData is not defined
// at Reports2 (repor.jsx:98:16)



import React, { useState, useEffect, useRef } from "react";
import { useFirebase } from "../Config/firebase";
import useFirebaseCRUD from "../Config/firebaseCRUD";
import { Bar, Line, Pie } from "react-chartjs-2";

const Reports2 = () => {
  const { fetchDonations, fetchRequests, fetchOrgData } = useFirebaseCRUD();

  // Fetch data for each report
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [orgData, setOrgData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDonations = await fetchDonations();
      setDonations(fetchedDonations);

      
      const fetchedRequests = await fetchRequests();
      setRequests(fetchedRequests);

    //   const fetchedOrgData = await fetchOrgData();
    //   setOrgData(fetchedOrgData);

    console.log(donations);
    console.log(requests);
    };

    fetchData();
  }, []);

//   useEffect(() => {
//     if (chartRef.current) {
//       chartRef.current.destroy(); // Destroy existing chart
//     }

//     const donationData = donations.length;
//     const requestData = requests.length;
//     const orgCount = orgData.length;

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
//       type: "bar",
//       data: data,
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//       },
//     });

//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy(); // Clean up on component unmount
//       }
//     };
//   }, [donations, requests]);

//   //counts
//   const counts = {
//     labels: ["Donations", "Requests", "Organizations"],
//     datasets: [
//       {
//         label: "Number of Donations, Requests, and Organizations",
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//         ],
//         borderWidth: 1,
//         hoverBackgroundColor: [
//           "rgba(255, 99, 132, 0.4)",
//           "rgba(54, 162, 235, 0.4)",
//           "rgba(255, 206, 86, 0.4)",
//         ],
//         hoverBorderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//         ],
//         data: [donationData, requestData, orgCount],
//       },
//     ],
//   };

//   const { getAllData } = useFirebaseCRUD();
//   const [organizations, setOrganizations] = useState([]);

//   useEffect(() => {
//     const fetchOrgData = async () => {
//       const fetchedOrganizations = await getAllData("Org_DATA");
//       setOrganizations(fetchedOrganizations);
//     };

//     fetchOrgData();
//   }, []);

//   const uniqueOrganizations = Array.from(new Set(organizations.map((org) => org.orgId))).length;

//   // Calculate total amount of food donated and requested
//   const totalFoodDonated = donations.reduce((total, donation) => total + donation.qtyDonating, 0);
//   const totalFoodRequested = requests.reduce((total, request) => total + request.requiredQty, 0);

//   // Calculate food wastage as the difference between donated and requested
//   const foodWastage = totalFoodDonated - totalFoodRequested;

//   // Chart data
//   const food_report = {
//     labels: ["Food Donated", "Food Requested", "Food Wasted"],
//     datasets: [
//       {
//         label: "Food Donation and Wastage Report",
//         backgroundColor: [
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//           "rgba(255, 99, 132, 0.2)",
//         ],
//         borderColor: [
//           "rgba(75, 192, 192, 1)",
//           "rgba(255, 159, 64, 1)",
//           "rgba(255, 99, 132, 1)",
//         ],
//         borderWidth: 1,
//         hoverBackgroundColor: [
//           "rgba(75, 192, 192, 0.4)",
//           "rgba(255, 159, 64, 0.4)",
//           "rgba(255, 99, 132, 0.4)",
//         ],
//         hoverBorderColor: [
//           "rgba(75, 192, 192, 1)",
//           "rgba(255, 159, 64, 1)",
//           "rgba(255, 99, 132, 1)",
//         ],
//         data: [totalFoodDonated, totalFoodRequested, foodWastage],
//       },
//     ],
//   };

//   //donation_trends
//   // Group donations by date and calculate total donations for each date
//   const donationsByDate = donations.reduce((acc, donation) => {
//     const date = donation.createdAt.toDate().toLocaleDateString();
//     if (!acc[date]) {
//       acc[date] = 0;
//     }
//     acc[date] += donation.qtyDonating;
//     return acc;
//   }, {});

//   const dates = Object.keys(donationsByDate);
//   const donationValues = Object.values(donationsByDate);

//   // Chart data
//   const donation_trends = {
//     labels: dates,
//     datasets: [
//       {
//         label: "Donations Trend Over Time",
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: "rgba(75,192,192,0.4)",
//         borderColor: "rgba(75,192,192,1)",
//         borderCapStyle: "butt",
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: "miter",
//         pointBorderColor: "rgba(75,192,192,1)",
//         pointBackgroundColor: "#fff",
//         pointBorderWidth: 1,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: "rgba(75,192,192,1)",
//         pointHoverBorderColor: "rgba(220,220,220,1)",
//         pointHoverBorderWidth: 2,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: donationValues,
//       },
//     ],
//   };

//   //dnoor engagement
//   // Group donations by donorId and count the number of donations for each donor
//   const donationsByDonor = donations.reduce((acc, donation) => {
//     const donorId = donation.donorId;
//     if (!acc[donorId]) {
//       acc[donorId] = 0;
//     }
//     acc[donorId]++;
//     return acc;
//   }, {});

//   // Calculate the total number of donations made by each donor
//   const donorEngagementData = Object.values(donationsByDonor);

//   // Chart data
//   const donor_engagement = {
//     labels: Object.keys(donationsByDonor),
//     datasets: [
//       {
//         label: "Number of Donations",
//         backgroundColor: "rgba(75,192,192,0.2)",
//         borderColor: "rgba(75,192,192,1)",
//         borderWidth: 1,
//         hoverBackgroundColor: "rgba(75,192,192,0.4)",
//         hoverBorderColor: "rgba(75,192,192,1)",
//         data: donorEngagementData,
//       },
//     ],
//   };

  return (
    <>
      <div>
        <h2>Organization Stats</h2>
        <p>Number of organizations participating in food donation: {uniqueOrganizations}</p>
      </div>

      <div>
        <h2>Donations and Requests</h2>
        <Bar data={counts} />
        <h3>Number of Donations: {donationData}</h3>
        <h3>Number of Requests: {requestData}</h3>
        <h3>Number of Organizations: {orgCount}</h3>
      </div>

      <div>
        <h2>Food Donation and Wastage Report</h2>
        <Bar data={food_report} />
        <h3>Total Food Donated: {totalFoodDonated}</h3>
        <h3>Total Food Requested: {totalFoodRequested}</h3>
        <h3>Food Wasted: {foodWastage}</h3>
      </div>

      <div>
        <h2>Donations Trend Over Time</h2>
        <Line data={donation_trends} />
      </div>

      <div>
        <h2>Donor Engagement Report</h2>
        <Bar data={donor_engagement} />
      </div>
    </>
  );
};

export default Reports2;
