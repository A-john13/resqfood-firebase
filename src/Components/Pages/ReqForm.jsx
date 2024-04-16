import React,{useState,useEffect} from 'react'
import {  Form,   FloatingLabel,   Row,   Col,  Button, } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import useFirebaseCRUD from '../../Config/firebaseCRUD';
import { useFirebase } from '../../Config/firebase';
import NavBar from '../Reusable/Nav'

import './CSS/ReqForm.css'

const ReqForm = () => {
  const firebase = useFirebase();
    const {UID} = useFirebase();
    const { addReqDonat } = useFirebaseCRUD();
    

  const time = new Date().toISOString().replace("T", " ").split(".")[0]
  const districts = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam',
    'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode',
    'Wayanad', 'Kannur', 'Kasaragod'
  ];
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
  recipientID:UID,
  status:0,
  adminVerify:false,
  createdAt:'' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity() === false) {
      return;
    } else if (formData.district===''){
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      await addReqDonat("REQs",formData);
      console.log("Req Details added");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className=" place-items-center reqForm">
       <>
       <NavBar className="pb-4"></NavBar>
       </>
    <div className="my-4 py-5 px-4 container reqFormContainer">
      <Form  validated={validated} onSubmit={handleSubmit}>
        <h2 className="pb-3 mb-1 text-center title">Request Form</h2>

          <Row className="g-2 mt-0" id="dateInput">
            <Col>
              <Form.Group className="mb-4">
                <FloatingLabel label="Date">
                  <Form.Control onChange={handleChange} type="date"
                    name="dateDonating"
                    placeholder="Date"
                    required
                    min={new Date().toISOString().split("T")[0]} 
                  />
                  <Form.Control.Feedback type="invalid">
                    Please specify the date you need supply
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col  className="mb-4">
            <FloatingLabel label="Alternate Number">
                  <Form.Control onChange={handleChange} name="alternatePhone" type="tel" 
                  pattern="[0-9]{10}" placeholder="alternatePhone"
                    required />
                  <Form.Control.Feedback type="invalid">
                    Please provide aternate number for communication
                  </Form.Control.Feedback>
                </FloatingLabel>
            </Col>          
        </Row>

        <Row className="g-2 m-0 ">
            <Col md>
            <Form.Group className="mb-4">
              <FloatingLabel  label="Address to drop off">
                <Form.Control className="capitalize" onChange={handleChange} name="addressDelivery" type="text" placeholder="Address"  pattern="[A-Za-z\s]*[A-Za-z][A-Za-z\s]*" required />
                <Form.Control.Feedback type="invalid">Provide your personal valid address</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
          <FloatingLabel>
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
         </Form.Control>
          </FloatingLabel>
          </Col>
          </Row>
        
        <Row className="g-2">
          <Col md>
            <Form.Group className="mb-4">
              <FloatingLabel label="No: of residents">
                <Form.Control onChange={handleChange} name="No_residents" type="number" pattern="[0-9]{4}" placeholder="No: of residents" required />
                <Form.Control.Feedback type="invalid">Please provide number of residents at the organisation</Form.Control.Feedback>
                <Form.Text>It should be a number, such that 10 - suggests food for 10 people</Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-4">
              <FloatingLabel label="Quantity Needed">
                <Form.Control onChange={handleChange} name="requiredQty" type="number" pattern="[0-9]{2}" placeholder="No: of residents" required />
                <Form.Control.Feedback type="invalid">Please provide the amount of food needed</Form.Control.Feedback>
                <Form.Text>Quantity in number, 10 suggests food for 10 people</Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
          
        </Row>
       
        <Row> 
            <Col md> 
             <Form.Group className="mb-4">
               <FloatingLabel label="How do you currently get your food supply?">
               <Form.Control onChange={handleChange} name="currentFoodSupply" type="text" placeholder="Enter how you currently get your food supply" /> 
             <Form.Control.Feedback type="invalid">Please specify how you currently get your food supply</Form.Control.Feedback> 
             <Form.Text>Describe your current method of obtaining food supply, such as purchasing from a store, receiving donations, or growing your own food.</Form.Text> 
             </FloatingLabel> 
             </Form.Group>
              </Col>
        </Row>
        
        <Row className="g-5 pb-3 justify-content-center">
          <Col className="mx-0 d-flex justify-content-center" md={6}>
            <Form.Group className="mb-3">
              <Form.Check required label="Agree to terms and conditions" feedback="You must agree before submitting." feedbackType="invalid" />
            </Form.Group>
          </Col>
          </Row>
          {/* <Col md>
            <Form.Group className="mb-3">
              <Form.Check  label="Urgent Request" name="urgent" feedbackType="invalid" />
            </Form.Group>
          </Col> */}
          <Row>
          <Col className="mx-0 d-flex justify-content-center" md={4}>
            <Button className="reqFormBTN" type="submit" style={{height:'40px',width:'110px'}}>Submit</Button>
          </Col>
        </Row>

        <Row className="g-5 pb-3 justify-content-center">
            <Col className="mx-0 d-flex justify-content-center" md={6}>
              <p className="text-center text-muted">
                Thank you for your request. We will get back to you shortly.
              </p>
            </Col>
          </Row>
      </Form>
    </div>
  </div>
  )
}

export default ReqForm
