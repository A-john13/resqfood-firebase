import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Config/firebase';
import { Form, Button, FloatingLabel } from "react-bootstrap";
import {FaEyeSlash,FaEye} from 'react-icons/fa'

import './CSS/SignIn.css'
 
const SignIn = () => {

  const { user, UID, userRole } = useFirebase();
  const firebase = useFirebase();
        const nav = useNavigate();
        const [showLogin, setShowLogin] = useState(true);
        const [showPwd,setShowPwd] = useState(false);
        const [validated, setValidated] = useState(false);

        const [formData, setFormData] = useState({
            email: "",
            pwd: "",
            userRole: "1",
            adminApprove:false,
            uid: UID,
          });

        const handleLogIn = async(event) => {
       //adminApprove
       const form = event.currentTarget;
       event.preventDefault();
       setFormData((prevData) => ({
         ...prevData,
         uid: UID,
       }));
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
      console.log(formData,'fomrdata');
      try {
        const result = await firebase.signInUser(formData.email, formData.pwd);
        // console.log('Login successful:', email, pwd);
    } catch (error) {
        console.error('Invalid credentials:', error.message);
    }
        }
    
    const signUP = async(event)=> {
        event.preventDefault();
        const form = event.currentTarget;
         setFormData((prevData) => ({
         ...prevData,
         adminApprove:false,})
         );
         if (form.checkValidity() === false) {
             event.preventDefault();
             event.stopPropagation();
         }
         console.log(formData,'form');
         setValidated(true);
         try{
          const newUser = await firebase.signUp(formData.email,formData.pwd,formData.userRole,formData.adminApprove);
      }catch(error){
          alert("error occured ",error);
          throw error;
      }
    };

  const handleRoleChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => {
      console.log('Selected Role:', value);
      return { ...prevData, userRole: value };
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  return (
    <div className='signInBox'> 

<div className="py-2 container-sm text-center signInContainer">
      {showLogin && (
        <div className='container signInForm'>
          <div className="pt-2 p-3 container heading2">Sign In</div>
          <Form className="row g-3 loginForm2" noValidate validated={validated} onSubmit={handleLogIn}>
           
            <FloatingLabel controlId="email" label="Email">
              <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">Please enter a valid email</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="password" label="Password">
            <Form.Control type={showPwd ? 'text' : 'password'} name="pwd" placeholder="Password"
            onChange={handleChange} pattern='(?=.*[a-z]).{6,}' required/>
            <Form.Control.Feedback type="invalid">Please enter a valid password</Form.Control.Feedback>
              <p className='showPWD' onClick={() => setShowPwd(!showPwd)}>Show {showPwd ? <FaEyeSlash style={{ height: '15px' }} /> : <FaEye />}</p>
            </FloatingLabel>
            <Button className="my-3 login-button2" type="submit">Login</Button>
          </Form>
        </div>
      )}
      {!showLogin && (
        <div className="container register2">
          <div className="pt-2 p-3 container heading2">Join Us</div>

          <Form className="row g-3 needs-validation loginForm2" noValidate validated={validated} onSubmit={signUP}>
            <FloatingLabel controlId="email" label="Email">
              <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">Please enter a valid email</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="password" label="Password">
            <Form.Control type={showPwd ?  'text' : 'password'} name="pwd" pattern='(?=.*[a-z]).{6,}' placeholder="Password" onChange={handleChange}
            required/>             
             <Form.Control.Feedback type="invalid">Please enter a valid password</Form.Control.Feedback>
              <p className='showPWD' onClick={() => setShowPwd(!showPwd)}>Show {showPwd ? <FaEyeSlash style={{ height: '15px' }} /> : <FaEye />}</p>
            </FloatingLabel>
            <p className='p-0 mb-1 checkbox-title'>How do you describe yourself</p>
            <div className="d-flex align-items-center">
              <Form.Group >
              <Form.Check inline label="Donor" name="group1"  value="1" type='radio' id='donor' onChange={handleRoleChange}/>
              <Form.Check inline label="Recipient" name="group1"  value="2" type='radio' id='recipient' onChange={handleRoleChange}/>
              </Form.Group>
            </div>
            <Button className="mt-4 mb-2 signup-button2" type="submit">Join Us</Button>

          </Form>
        </div>
      )}
   

    <div className="pb-1 mb-3 container social-account-container">
          <div className="d-flex justify-content-center social-accounts">
            <button className="social-button google">
              <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg></button>
            <button className="social-button apple">
              <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
              </svg>
            </button>
            <button className="social-button twitter">
              <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
              </svg>
            </button>
          </div>
        </div>
     <a  className='changeForm' onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'New user : Click to Join ' : 'Click to Login'}</a>
    </div>
  </div>
  )
}

export default SignIn
