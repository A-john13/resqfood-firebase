import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Toast from "react-bootstrap/Toast";
import useFirebaseCRUD from "../../Config/firebaseCRUD";
import { useFirebase } from "../../Config/firebase";

const Notifications = ({ show, handleClose }) => {
  const { UID, userRole } = useFirebase();
  const { getNotifications } = useFirebaseCRUD();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifications = await getNotifications(UID);
      setNotifications(notifications);
      console.log(notifications);
    };
    fetchNotifications();
  }, [UID]);


  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Notifications</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {notifications.map((notification, index) => (
          <Toast
            className="mt-1"
            key={index}
            onClose={handleClose}
            style={{
              background: notification.status === 0 ? "orangered" : "grey",
            }}>
            <Toast.Header>
              <strong className="me-auto">{notification.message}</strong>
            </Toast.Header>
            <Toast.Body>
              {notification.status === 0 ? "Unread" : null}
            </Toast.Body>
          </Toast>
        ))}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Notifications;
