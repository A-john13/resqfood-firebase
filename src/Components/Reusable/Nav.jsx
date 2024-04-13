import { useNavigate,Link } from "react-router-dom";
import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import Notifications from "./NotificationsOffCanvas";

import { useFirebase } from "../../Config/firebase";
 import '../../App.css'

const NavBar = () => {

    const firebase = useFirebase();
    const {userRole,UID,user} = useFirebase();
    const nav=useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const out =() =>{
      firebase.SignOut();
      nav('/');
    }
    const renderNavContent = () => {
      switch (userRole) {
        case "1":
          return (
            <>
              <Nav.Link as={Link} to="/user/donate">Make Donation</Nav.Link>
              <Nav.Link onClick={() => setShowNotifications(!showNotifications)}>Notifications</Nav.Link>              <Nav.Link as={Link} to="/user/role/donprofile">Profile</Nav.Link>
            </>
          );
        case "2":
          return (
            <>
              <Nav.Link as={Link} to="/user/request">Make Request</Nav.Link>
              <Nav.Link onClick={() => setShowNotifications(!showNotifications)}>Notifications</Nav.Link>              <Nav.Link as={Link} to="/user/role/reciprofile">Profile</Nav.Link>
            </>
          );
        default:
          return null;
      }
    };
  
    return (
      <div className="p-0 m-0 container-fluid  navBarComponent" style={{width:'90dvw',placeContent:'start'}}>
      <Navbar  expand="sm" style={{fontWeight:'500', }}>
        <Navbar.Brand as={Link} to="/home">
          <img
            src="/Logo.png"
            alt="Logo"
            style={{ height: "50px", width: "90px" ,paddingLeft:'15px'}}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" >
           
            
            
            {renderNavContent()}
  
          </Nav>
          <Nav>
            { user && UID &&
            <Nav.Link className="d=flex justify-content-end align-item-end">
              <Button variant='outline-success' style={{fontWeight:'bold'}} onClick={out}> Logout </Button>
              </Nav.Link>
          }
          {!user &&
            <Nav.Link className="d=flex justify-content-end align-item-end">
              <Button variant='outline-success' as={Link}  to="/login" style={{fontWeight:'bold'}} > Log In </Button>
              </Nav.Link>
          }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Notifications show={showNotifications} handleClose={() => setShowNotifications(false)} /> 
           </div>
    );
  };
  
  export default NavBar;