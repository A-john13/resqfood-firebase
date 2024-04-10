import React,{useState} from 'react';
import useFirebaseCRUD from '../../Config/firebaseCRUD';
import  Modal from 'react-bootstrap/Modal';
import  Form from 'react-bootstrap/Form';
import  Button from 'react-bootstrap/Button';
import  FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Config/firebase';

const OrgModal = () => {

  const {UID,userRole} = useFirebase();
   const {addOrgData} = useFirebaseCRUD();
  const [showOrgModal, setShowOrgModal] = useState(true);
  const [validated, setValidated] = useState(false);

  const handleOrgModalClose = () => {
    setShowOrgModal(false);
    setFormData({ ...formData,});
  };

  const [formData, setFormData] = useState({
    orgName: "",
    orgEmail: "",
    orgPhone: "",
    orgProof: null,
    orgAddress: "",
    orgDistrict: "",
    orgPincode: "",
    representID:UID,
    orgRole:userRole,
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
      ...formData,
      [name]: value
  });
  console.log('org details'+ formData);
};
const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
        ...formData,
        orgProof: file,
    });
};

const handleOrgSubmit = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  setValidated(true);

  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    console.log('Form is not valid');
    alert('form not valid')
    }
    else if( form.checkValidity() === true){
    try {
        const id = await addOrgData(formData,formData.proof);
        console.log('Organization added with ID:', id);
        handleOrgModalClose();
        alert("Your data has been submitted");
    } catch (error) {
        console.error('Error adding organization:', error);
    }
  } 
};

  return (
    <>
     <Modal show={showOrgModal} onHide={handleOrgModalClose} backdrop="static"
        keyboard={false}>
  <Modal.Header closeButton>
    <Modal.Title>Organization Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>

    <Form className="OrgForm" noValidate validated={validated}>
      <Form.Text>Please enure that the address is of organisation</Form.Text>
      <Form.Group className="py-3"controlId="orgName">
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

      <Form.Group className="py-3"controlId="orgEmail">
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

      <Form.Group className="py-3"controlId="orgPhone">
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

      <Form.Group className="py-3"controlId="orgProof">
        <FloatingLabel label="Proof/Certificate of Organization">
        <Form.Control
          type="file"
          name="orgProof"
          onChange={handleFileChange}
          required
          accept="image/jpeg, image/png"
        />
        <Form.Text className="text-muted">
          Please upload proof/certificate in JPEG or PNG format (max size 1MB).
        </Form.Text>
      </FloatingLabel>
</Form.Group>

      <Form.Group className="py-3"controlId="orgAddress">
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

      <Form.Group className="py-3"controlId="orgDistrict">
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

      <Form.Group className="py-3"controlId="orgPincode">
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
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleOrgModalClose}>
      Close
    </Button>
    <Button variant="primary" onClick={handleOrgSubmit}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>
</>
  );
};

export default OrgModal;





// const handleOrgSubmit = async () => {
//   try {
//     const orgDetailsRef = doc(db, 'USERS', UID, 'OrgDetails');
//     const orgDetailsData = {
//       orgName: formData.orgName,
//       orgEmail: formData.orgEmail,
//       orgPhone: formData.orgPhone,
//       orgProof: '', 
//       orgAddress: formData.orgAddress,
//       orgDistrict: formData.orgDistrict,
//       orgPincode: formData.orgPincode,
//       createdAt: serverTimestamp(),
//       adminVerifyOrg: false,
//     };

//     // // Upload the proof image
//     // const proofRef = ref(storage, `orgProofs/${UID}`);
//     // await uploadBytes(proofRef, formData.orgProofFile);

//     // // Get the download URL of the uploaded image
//     // const downloadURL = await getDownloadURL(proofRef);
//     // orgDetailsData.orgProof = downloadURL;

//     // // Add organization details to Firestore
//     // await setDoc(orgDetailsRef, orgDetailsData);

//     // Close the modal
//     handleOrgModalClose();
//   } catch (error) {
//     console.error('Error adding organization details:', error);
//   }
// };

// const handleOrgProofChange = (e) => {
//   const file = e.target.files[0];
//   if (file.size > 1000000 || (file.type !== 'image/jpeg' && file.type !== 'image/png')) {
//     alert('Please select an image file less than 1 MB in size.');
//     e.target.value = null;
//   } else {
//     setFormData({ ...formData, orgProof: file });
//   }
// };