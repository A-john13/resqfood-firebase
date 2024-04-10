
import React from "react";
import { Card, Button } from "react-bootstrap";

import './CSS/AdminCard.css'

const AdminCard = ({ type, data }) => {
  const renderCardContent = () => {
    console.log(type,'\n',data)
    switch (type) {
      case "requests":
        return (
          <>
            <Card.Title>{data.fullName}</Card.Title>
            <Card.Text>
              <strong>City:</strong> {data.city}<br />
              <strong>Street:</strong> {data.street}<br />
              <strong>Pin:</strong> {data.pin}<br />
              <strong>Quantity:</strong> {data.quantity}<br />
              <strong>Organization:</strong> {data.org}<br />
              <strong>Organization Name:</strong> {data.orgName}<br />
              <strong>Organization Contact:</strong> {data.orgContact}<br />
              <strong>Status:</strong> {data.status}<br />
              <strong>Created At:</strong> {data.createdAt}<br />
            </Card.Text>
          </>
        );
      case "donations":
        return (
          <>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>
              <strong>Phone:</strong> {data.phone}<br />
              <strong>Organization:</strong> {data.org}<br />
              <strong>Organization Contact:</strong> {data.orgContact}<br />
              <strong>Quantity:</strong> {data.quantity}<br />
              <strong>Reason:</strong> {data.reason}<br />
              <strong>Status:</strong> {data.status}<br />
              <strong>Created At:</strong> {data.createdAt}<br />
            </Card.Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="my-3 rounded-4 mx-2 text-center adminCard">
      <Card.Body className="rounded-4 cardBody" xs={8}>
        {renderCardContent()}
        <Button variant="primary" className="mx-2">Edit</Button>
        <Button variant="danger" className="mx-2">Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default AdminCard;
