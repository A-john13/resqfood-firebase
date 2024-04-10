import React,{ useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import { useFirebase } from './Config/firebase'
import ProtectRoutes from './Config/ProtectRoutes'

import LandingPage from './Components/Pages/LandingPage'
import SignIn from './Components/Pages/SignIn'
import Home from './Components/Pages/Home'
import RegisterPersonal from './Components/Pages/RegisterPersonal'
import OrgModal from './Components/Pages/OrgModal'
import DonationForn from './Components/Pages/DonationForn'
import ReqForm from './Components/Pages/ReqForm'
import DonorProfile from './Components/Pages/DonorProfile'
import RecipientProfile from './Components/Pages/RecipientProfile'

import AdminDash from './AdminComponents/AdminDash'
import Reports from './AdminComponents/AdminReports'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import AutomaticMatching from './AdminComponents/AutoMatching'
import Reports2 from './AdminComponents/repor'

function App() {

  return (
    <div className="AppBox">

      <Routes>
      <Route path="/report" element={ <Reports/> }/>
        <Route path="/" element={ <LandingPage/> }/>

        
        <Route path="/1" element={ <AutomaticMatching/> }/>
        <Route path="/w" element={ <Reports2/> }/>
        <Route path="/r" element={ <Reports/> }/>

        <Route path="/login" element={ <SignIn/> }/>
        <Route path="/home" element={ <Home/> }/>
        <Route path="/user/role/adminDash" element={ <AdminDash/> }/>
        <Route path="/user/role/donprofile" element={ <DonorProfile/> }/>
        <Route path="/user/role/reciprofile" element={ <RecipientProfile/> }/>
        <Route path="/user/donate" element={ <DonationForn/> }/>
        <Route path="/user/request" element={ <ReqForm/> }/>
        <Route path="/user/signup/initialForm" element={ <RegisterPersonal/> }/>
        <Route path="/user/orgForm" element={ <OrgModal/> }/>

      </Routes>
    </div>
  )
}

export default App
