import React, { useState, useEffect,useRef } from "react";
import { useFirebase } from "../Config/firebase";
import useFirebaseCRUD from "../Config/firebaseCRUD";
import {Bar,Line,Pie} from 'react-chartjs-2'
import Chart from 'chart.js/auto';

import './CSS/AdminReports.css'
const Reports = () => {
    const { fetchAllDonations,getGroupByDonorId, getGroupByDistrict} = useFirebaseCRUD();
    const [donations, setDonations] = useState([]);
    const [requests, setRequests] = useState([]);
    const chartRef = useRef(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const fetchedDonations = await fetchAllDonations();
        setDonations(fetchedDonations);
  
        // const fetchedRequests = await fetchAllReqs();
        // setRequests(fetchedRequests);
      };
  
      fetchData();
    }, [,]);
  
    useEffect(() => {
    
  
      const donationData = donations.length;
      const requestData = requests.length;
  
      const data = {
        labels: ["Donations", "Requests"],
        datasets: [
          {
            label: "Number of Donations and Requests",
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
            hoverBackgroundColor: ["rgba(255, 99, 132, 0.4)", "rgba(54, 162, 235, 0.4)"],
            hoverBorderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            data: [donationData, requestData],
          },
        ],
      };
  
      const ctx = document.getElementById("myChart").getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "polarArea",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: true,
        },
      });
  
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy(); 
        }
      };
    }, [donations, requests]);


    const [donationsByDonorId, setDonationsByDonorId] = useState([]);
  const [donationsByDistrict, setDonationsByDistrict] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const donorIdData = await getGroupByDonorId();
      const districtData = await getGroupByDistrict();

      setDonationsByDonorId(donorIdData);
      setDonationsByDistrict(districtData);
    };

    fetchData();
  }, []);
  
  console.log(donationsByDistrict);
  console.log(donationsByDonorId);
    return (
      <div className="adminReportBox">

      <div className="reports" >
        <h2>Reports</h2>
        <canvas id="myChart"></canvas>


        <div>
      <h2>Donation Reports</h2>
      <h3>Donations by Donor ID</h3>
      <ul>
        {donationsByDonorId.map((donation) => (
          <li key={donation.donorId}>
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

      </div>
  </div>
    );
  };
  
  export default Reports;