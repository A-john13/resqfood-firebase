
import React,{useEffect, useState} from "react";
import { Form, Row, Col, Button,FloatingLabel,Modal,Container} from "react-bootstrap";
import { useFirebase } from "../../Config/firebase";
import NavBar from "../Reusable/Nav";
import useFirebaseCRUD from "../../Config/firebaseCRUD";
import { useNavigate } from "react-router-dom";
import OrgModal from "./OrgModal";
import axios from "axios";
import './CSS/RegisterPersonal.css'

const RegisterPersonal = () => {
  const firebase = useFirebase();
  const { addUserData,getUserData } = useFirebaseCRUD();

  const {user,UID,userRole} = useFirebase();
  const nav = useNavigate();
  const [userData, setUserData] = useState(null);
  
  //Location Coordinates
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);

  useEffect(() => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              async (position) => {
                  setLatitud(position.coords.latitude);
                  setLongitud(position.coords.longitude);
                  
                  console.log(latitud,longitud)
              },
              (error) => {
                  console.error(error.message);
              }
          );
      } else {
          console.error("Geolocation is not supported by this browser.");
      }
  }, [latitud, longitud]);

  const districts = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam',
    'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode',
    'Wayanad', 'Kannur', 'Kasaragod'
  ];
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    fullName: "",
    address: "",
    district: "",
    pinCode: "",
    phone: "",
    isOrg: true,
    uid: UID,
    latitude:'',longitude:'',
    proof:null,
    adminVerifyDetails: false,
  });

      const handleChange = (e) => {
        const { name, value  } = e.target;

        if (name === 'proof') {
          setFormData((prevData) => ({
            ...prevData,

            [name]: e.target.files[0]
          }));
        } 
        else {
          setFormData({ ...formData, [name]: value });
        }
      }
      
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      
    } else if (formData.orgDistrict===''){
      event.preventDefault();
      event.stopPropagation();
    }    
    setValidated(true);
    try {
      event.preventDefault();
      const id =  addUserData(formData,formData.proof,latitud,longitud);
      console.log('Data added successfully with ID:', id);
      
      if(formData.isOrg === false){
        
      alert("Thankyou data submitted");
      }
      if(formData.isOrg === true){
        nav('/user/orgForm');
      }
      
    } catch (error) {
      alert(error)
      console.error("Error adding user data:", error);
    }
  
  }
  const handleProofChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1500000 || (file.type !== 'image/jpeg' && file.type !== 'image/png')) {
      alert('Please select an image file less than 1.5 MB in size.');
      e.target.value = null;
    } else {
      setFormData({ ...formData, proof: file });
    }
  };
 

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData(UID);
      setUserData(userData);
    };
    fetchUserData();
    if (userData) {
      nav('/home');
    };
  }, [UID, getUserData]);


  return (
    <>
    


     <div className="d-flex flex-column register" style={{ width: "100vw", minHeight: '100vh' }}>
     <NavBar ></NavBar>

      <Form className="my-5 registerForm" validated={validated} onSubmit={handleSubmit} style={{ width: '50vw' }} >
        <Row className="m-0 px-2 py-1 text-center">
          <h3 className="m-0 p-3 title">Introduce Yourself</h3>
          <h5>Email : {firebase.user.email}</h5>

          <Row className="g-2 m-0 " style={{ width: '95%' }}>
            <Col md>
              <Form.Group className="mb-4">
                <FloatingLabel label="First Name">
                  <Form.Control name="firstName" type="text"  placeholder="First Name" required onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">Please enter your first name  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>

            <Col md>
              <Form.Group className="mb-4">
                <FloatingLabel label="Full Name">
                  <Form.Control name="fullName" type="text" placeholder="Fullname" required onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">Please enter your full name </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-2 m-0 " style={{ width: '95%' }}>

          <Form.Text style={{fontWeight:'bold'}}>Please enure that the address provided is Personal</Form.Text>

            <Col md={8} >
              <Form.Group className="mb-4">
                <FloatingLabel label="Address">
                  <Form.Control name="address" type="textArea" placeholder="address" required onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">Please enter your address </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
            
           
          </Row>

          <Row className="g-2 m-0 " style={{ width: '95%' }}>
          <Col md>
              <Form.Group className="mb-4">
                <FloatingLabel label="Pin Code">
                  <Form.Control name="pinCode" type="text" pattern="[0-9]{6}" placeholder="Pincode" required onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">Please enter valid pincode </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col md >
              <Form.Group className="mb-4">
                <FloatingLabel label="District">
                <Form.Control
                  as="select"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  placeholder="Enter district"
                > <option value=''>Select District</option>
                {districts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
                 <Form.Control.Feedback type="invalid">Please select a district </Form.Control.Feedback>
                 <Form.Control.Feedback type="invalid">Please enter district </Form.Control.Feedback>
                </Form.Control>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col md >
              <Form.Group className="mb-4">
                <FloatingLabel label="Phone">
                  <Form.Control name="phone" type="tel" pattern="[0-9]{10}" placeholder="Phone" required onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">Please enter a valid 10 digit number  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-2 m-0 " style={{ width: '95%' }}>
           

            <Col md>
              <Form.Group className="mb-4">
                <FloatingLabel style={{ color: 'blue' }} label="Are you with any Organisation?">
                  <Form.Select name="isOrg" value={formData.isOrg} aria-label="Floating label select example" placeholder="Are you with any organisation"
                  onChange={(e) => setFormData({ ...formData, isOrg: e.target.value })} required>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Form.Select>
                  {formData.isOrg === null &&
                    <Form.Control.Feedback type="invalid">Please select an option </Form.Control.Feedback>
                  }
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col md >
              <Form.Group className="mb-4">
                <FloatingLabel label="Proof">
                  <Form.Control name="proof" type="file" placeholder="file" required onChange={handleProofChange} />
                  <Form.Control.Feedback type="invalid">Please provide your valid id  </Form.Control.Feedback>
                </FloatingLabel>
                <Form.Text>Please upload your ID card for validating account</Form.Text>
              </Form.Group>
            </Col>
          </Row>
      <Button type="submit" className="mb-2" id="regBtn">  Submit </Button>
    </Row> 
    </Form>

    </div>
    
</>
  );
};

export default RegisterPersonal;


    