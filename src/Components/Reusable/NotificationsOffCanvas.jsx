import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Toast from 'react-bootstrap/Toast';
import useFirebaseCRUD from '../../Config/firebaseCRUD';
import { useFirebase } from '../../Config/firebase';

const Notifications = () => {
  const { UID, userRole } = useFirebase();
  const { getNotifications } = useFirebaseCRUD();
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);

  Notifications.handleShow = () => setShow(true);

  // useEffect(() => {
  //   // Fetch notifications when component mounts
  //   getNotifications(UID, userRole);
  //   // .then((notifications) => {
  //   //   setNotifications(notifications);
  //   // });
  // }, [UID, userRole, getNotifications]);

  const handleClose = () => setShow(false);

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Notifications</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {notifications.map((notification, index) => (
          <Toast key={index} onClose={handleClose}>
            <Toast.Header>
              <strong className="me-auto">{notification.title}</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>{notification.message}</Toast.Body>
          </Toast>
        ))}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Notifications;
