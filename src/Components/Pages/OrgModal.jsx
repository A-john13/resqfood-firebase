import React, { useState,useEffect } from "react";
import useFirebaseCRUD from "../../Config/firebaseCRUD";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../Config/firebase";

const OrgModal = () => {
  const { UID, userRole } = useFirebase();
  const nav = useNavigate();
  const { addOrgData,getOrgUserData } = useFirebaseCRUD();
  const [validated, setValidated] = useState(false);
  const [orgData,setOrgData] = useState(null);

  const [formData, setFormData] = useState({
    orgName: "",
    orgEmail: "",
    orgPhone: "",
    orgProof: null,
    orgAddress: "",
    orgDistrict: "",
    orgPincode: "",
    representID: UID,
    orgRole: userRole,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1000000 || (file.type !== 'image/jpeg' && file.type !== 'image/png')) {
      alert('Please select an image file less than 1 MB in size.');
      e.target.value = null;
    } else {
      setFormData({ ...formData, orgProof: file });
    }
  };

  const handleOrgSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    try {
      console.log("try");
      const id = await addOrgData(formData, formData.orgProof);
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
      nav('/home');
    };
  }, [UID, getOrgUserData]);

  return (
    <>
          <Form variant="dark"
            className="OrgForm"
            validated={validated}
            onSubmit={handleOrgSubmit}>
            <Form.Text>
              Please enure that the address is of organisation
            </Form.Text>
            <Form.Group className="py-3" controlId="orgName">
              <FloatingLabel label="Name of Organization">
                <Form.Control
                  type="text"
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleChange}
                  required
                  placeholder="Enter organization name"
                />
              </FloatingLabel>
            </Form.Group>

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

            <Form.Group className="py-3" controlId="orgAddress">
              <FloatingLabel label="Address of Organization">
                <Form.Control
                  type="text"
                  name="orgAddress"
                  value={formData.orgAddress}
                  onChange={handleChange}
                  required
                  placeholder="Enter organization address"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="py-3" controlId="orgDistrict">
              <FloatingLabel label="District where organisation situated">
                <Form.Control
                  type="text"
                  name="orgDistrict"
                  value={formData.orgDistrict}
                  onChange={handleChange}
                  required
                  placeholder="Enter district"
                />
              </FloatingLabel>
            </Form.Group>

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
              <Button className="mt-2" variant="primary" type="submit">
                Save Changes
              </Button>
            </Form.Group>
          </Form>
  
    </>
  );
};

export default OrgModal;
