import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"

const CustomCard = () => {
    
  return (
    <div className="p-3 cardCompo" style={{ width: "16rem" }} >
      <Card style={{ width: "14rem" }} border="info" className="text-center card">
        <Card.Img variant="top" src="/donation0.png" style={{ maxHeight: "160px", maxWidth:'288px' }} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          {/* <Button variant="primary">Details</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CustomCard;
