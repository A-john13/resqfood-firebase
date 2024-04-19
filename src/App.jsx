import React,{ useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import { useFirebase } from './Config/firebase'
import ProtectRoutes from './Config/ProtectRoutes'

import MapComponent from './Config/deny/Map'
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
import Deny1 from './Config/deny/Deny1'
import Deny2 from './Config/deny/deny2'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import AutomaticMatching from './AdminComponents/AutoMatching'
import AdminInterface from './AdminComponents/AdminCombinations'
import Reports2 from './AdminComponents/repor'

function App() {

  return (
    <div className="AppBox">

      <Routes> 
        <Route path='/map' element={ <MapComponent/>}/>
      <Route path="/report" element={ <Reports/> }/>

        
        <Route path="/1" element={ <AutomaticMatching/> }/>
        <Route path="/deny" element={ <Deny1/> }/>
        <Route path="/deny2" element={ <Deny2/> }/>
        <Route path='/user/role/adminDash/posibleMatches' element={ <AdminInterface/>}/>
        <Route path="/w" element={ <Reports2/> }/>
        <Route path="/r" element={ <Reports/> }/>



        <Route path="/" element={ <LandingPage/> }/>
        <Route path="/login" element={ <SignIn/> }/>
        <Route path="/home" element={ <Home/> }/>
        <Route path="/user/role/adminDash" element={ <ProtectRoutes><AdminDash/> </ProtectRoutes> }/>
        <Route path="/user/role/donprofile" element={ <ProtectRoutes> <DonorProfile/> </ProtectRoutes> }/>
        <Route path="/user/role/reciprofile" element={ <ProtectRoutes>  <RecipientProfile/> </ProtectRoutes>}/>
        <Route path="/user/donate" element={ <ProtectRoutes> <DonationForn/></ProtectRoutes> }/>
        <Route path="/user/request" element={<ProtectRoutes>  <ReqForm/> </ProtectRoutes>}/>
        <Route path="/user/signup/initialForm" element={ <ProtectRoutes> <RegisterPersonal/> </ProtectRoutes>}/>
        <Route path="/user/signup/orgForm" element={<ProtectRoutes>  <OrgModal/></ProtectRoutes> }/>



      </Routes>
    </div>
  )
}

export default App
