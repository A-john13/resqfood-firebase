import React, { useState, useEffect } from "react";
import useFirebaseCRUD from "../../Config/firebaseCRUD";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../Config/firebase";

import "./CSS/RegisterPersonal.css";

const OrgModal = () => {
  const { UID, userRole } = useFirebase();
  const nav = useNavigate();
  const { addOrgData, getOrgUserData } = useFirebaseCRUD();
  const [validated, setValidated] = useState(false);
  const [orgData, setOrgData] = useState(null);

  const districts = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod",
  ];

  const [formData, setFormData] = useState({
    orgName: "",
    orgEmail: "",
    orgPhone: "",
    orgProof: null,
    orgAddress: "",
    orgDistrict: null,
    orgPincode: "",
    representID: UID,
    orgRole: userRole,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "orgProof") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file.size > 1000000 ||
      (file.type !== "image/jpeg" && file.type !== "image/png")
    ) {
      alert("Please select an image file less than 1 MB in size.");
      e.target.value = null;
    } else {
      setFormData({ ...formData, orgProof: file });
    }
  };

  const handleOrgSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (formData.orgDistrict === "") {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    try {
      console.log(formData);
      const id = await addOrgData(formData, formData.orgProof);
      event.preventDefault();
      return id;
    } catch (error) {
      console.error("Error adding organization:", error);
    }
  };

  useEffect(() => {
    const fetchOrgData = async () => {
      const data = await getOrgUserData(UID);
      setOrgData(data);
    };
    fetchOrgData();
    if (orgData) {
      nav("/home");
    }
  }, [UID, getOrgUserData]);

  return (
    <div className="OrgFormBox" style={{ width: "100vw", minHeight: '100vh' }}>
      <Form
        variant="dark"
        className="p-3 OrgForm"
        validated={validated}
        onSubmit={handleOrgSubmit}>
        <Row>
          <h3 className="m-0 p-3 title">Organisation Details</h3>
          <Col>
            <Form.Group className="py-3" controlId="orgName">
              <FloatingLabel label="Name of Organization">
                <Form.Control
                  className="capitalize"
                  type="text"
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleChange}
                  required
                  placeholder="Enter organization name"
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="py-3" controlId="orgEmail">
              <FloatingLabel label="Email of Organization">
                <Form.Control
                  type="email"
                  name="orgEmail"
                  value={formData.orgEmail}
                  onChange={handleChange}
                  required
                  placeholder="Enter organization email"
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            
            <Form.Group className="py-3" controlId="orgPhone">
              <FloatingLabel label="Phone of Organization">
                <Form.Control
                  type="tel"
                  name="orgPhone"
                  value={formData.orgPhone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  placeholder="Enter organization phone"
                />
                <Form.Text className="text-muted">
                  Please enter a valid 10-digit Indian phone number.
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            
            <Form.Group className="py-3" controlId="orgProof">
              <FloatingLabel label="Proof/Certificate of Organization">
                <Form.Control
                  type="file"
                  name="orgProof"
                  onChange={handleFileChange}
                  required
                  accept="image/jpeg, image/png"
                />
                <Form.Text className="text-muted">
                  Please upload proof/certificate in JPEG or PNG format (max
                  size 1MB).
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          
          <Form.Text>
            <strong>Please enure that the address is of organisation</strong>
          </Form.Text>
          <Col>
            <Form.Group className="py-3" controlId="orgAddress">
              <FloatingLabel label="Address of Organization">
                <Form.Control
                  className="capitalize"
                  type="text"
                  name="orgAddress"
                  value={formData.orgAddress}
                  onChange={handleChange}
                  required
                  placeholder="Enter organization address"
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            
            <Form.Group className="py-3" controlId="orgDistrict">
              <FloatingLabel label="District where organisation situated">
                <Form.Control
                  as="select"
                  name="orgDistrict"
                  value={formData.orgDistrict}
                  onChange={handleChange}
                  required
                  placeholder="Enter district">
                  
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                  <Form.Control.Feedback type="invalid">
                    Please select a district
                  </Form.Control.Feedback>
                </Form.Control>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Row style={{placeContent:'center'}}>
          <Col md={4}>
            <Form.Group className="py-3" controlId="orgPincode">
              <FloatingLabel label="Pincode of organisation">
                <Form.Control
                  type="text"
                  name="orgPincode"
                  value={formData.orgPincode}
                  onChange={handleChange}
                  pattern="[0-9]{6}"
                  required
                  placeholder="Enter pincode"
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          </Row>

          <Row md={5}>
            <Button className="mt-2" variant="primary" type="submit">
              Submit Details
            </Button>
          </Row>
       
      </Form>
    </div>
  );
};

export default OrgModal;
