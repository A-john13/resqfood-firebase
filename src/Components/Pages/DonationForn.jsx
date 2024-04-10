import React, { useState } from "react";
import {
  Form,
  FloatingLabel,
  Row,
  Col,
  Button,
  Container,
} from "react-bootstrap";
import { useFirebase } from "../../Config/firebase";
import useFirebaseCRUD from "../../Config/firebaseCRUD";

import "./CSS/DonationForm.css";

const DonationForn = () => {
  const firebase = useFirebase();
  const { addReqDonat } = useFirebaseCRUD();
  const { UID, userRole } = useFirebase();
  const time = new Date().toISOString().replace("T", " ").split(".")[0];

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    donorID: UID,
    adminVerify: false,
    createdAt: time,
    status: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === false) {
      return;
    }
    
  // Check if all required fields have values
  const requiredFields = ["mealType", "Donation_Address", "district", "qtyDonating", "dateDonating", "ExpirationTime"];
  const hasEmptyRequiredFields = requiredFields.some(field => !formData[field]);

  if (hasEmptyRequiredFields) {
    alert("Please fill in all required fields.");
    return;
  }

    try {
      await addReqDonat("DONATs", formData);
      console.log("DonationDetails added");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="py-4 d-flex justify-content-center donationForm">
      <div className="py-4 px-4 m-0 container donationFormContainer">
        <Form validated={validated} onSubmit={handleSubmit}>
          <h2 className="pb-3 text-center title">Donation Form</h2>

          <Row className="g-2 m-0">
            <Col md={7} className="m-0">
              <Form.Group className="mb-4">
                <FloatingLabel label="Meal Type">
                  <Form.Select
                    name="Meal Type"
                    value={formData.mealType}
                    aria-label="Floating label select example"
                    placeholder="Meal type"
                    onChange={(e) =>
                      setFormData({ ...formData, mealType: e.target.value })
                    }
                    required>
                    <option >Select here</option>
                    <option value="Breakfast">BreakFast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Specify the Meal Type, as in breakfast,lunch or dinner
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-2 m-0 ">
          <Form.Text>Please enure that the address provided is pickup location,you can provide name of street</Form.Text>
            <Col className="m-0">
              <Form.Group className="mb-4">
                <FloatingLabel label="Address of Pickup">
                  <Form.Control
                    onChange={handleChange}
                    as="textarea"
                    name="Donation_Address"
                    placeholder="Address of pickup"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Provide your drop off address
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col md className="m-0">
              <Form.Group className="mb-4">
                <FloatingLabel label="District">
                  <Form.Control
                    onChange={handleChange}
                    type="text"
                    name="district"
                    placeholder="District"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Provide a valid District name
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
           
          </Row>

          <Row className="g-2 mt-0" id="dateInput">
            
          <Col md className="m-0">
              <Form.Group className="mb-4">
                <FloatingLabel label="Quantity donating">
                  <Form.Control
                    onChange={handleChange}
                    type="text"
                    pattern="[0-9]{1,2}"
                    name="qtyDonating"
                    placeholder="Quantity"
                    required
                  />
                  <Form.Text className="text-muted">
                    For how many individuals e.g, 10 - persons
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please provide Quantity donating as a number - e.g, 10
                    suggests for 10 persons
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col md className="m-0">
              <Form.Group className="mb-4">
                <FloatingLabel label="Date">
                  <Form.Control
                    onChange={handleChange}
                    type="date"
                    name="dateDonating"
                    placeholder="Date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please specify the date you wish to donate
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col md className="m-0">
              <Form.Group className="mb-4">
                <FloatingLabel label="Expiration Time">
                  <Form.Control
                    onChange={handleChange}
                    type="time"
                    name="ExpirationTime"
                    placeholder="Time"
                    required
                  />
                  <Form.Text>
                  Specify  time the food will stay fresh!
                    The time is in 24hr format, ensure the correct time
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please specify the how long the food will stay fresh
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-5 justify-content-center">
            <Col className="mx-0 d-flex justify-content-center" md>
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="mx-0 d-flex justify-content-center" md={4}>
              <Button className="donatBTN" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default DonationForn;


{/* <Col md className="m-0">
<Form.Group className="mb-4">
  <FloatingLabel label="Pin code">
    <Form.Control
      onChange={handleChange}
      type="text"
      name="pinCode"
      pattern="[0-9]{6}"
      placeholder="Pin code"
      required
    />
    <Form.Control.Feedback type="invalid">
      Please provide a 6 digit Pin code of organisation residence
    </Form.Control.Feedback>
  </FloatingLabel>
</Form.Group>
</Col>

             <Col className="m-0">
             <FloatingLabel label="Alternate Number">
               <Form.Control
                 onChange={handleChange}
                 name="alternatePhone"
                 type="tel"
                 pattern="[0-9]{10}"
                 placeholder="alternatePhone"
                 required
               />
               <Form.Control.Feedback type="invalid">
                 Please provide aternate number for communication
               </Form.Control.Feedback>
             </FloatingLabel>
           </Col>
            <Row className="g-2 m-0">
            <Col md className="m-0">
              <Form.Group className="mb-4">
                <FloatingLabel label="Street">
                  <Form.Control
                    onChange={handleChange}
                    type="text"
                    name="Donating_Street"
                    placeholder="Street"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please specify the street name you are preparing food
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
            
          </Row> */}
