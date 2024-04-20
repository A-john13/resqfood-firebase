import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"

const CustomCard = () => {
    


  const organizations = [
    {
      title: "Asha Bhavan",
      image: "/donation0.png",
      description: "Asha Bhavan is a non-profit organization dedicated to underprivileged children in rural areas.",
    },
    {
      title: "Mercy Home",
      image: "/donation3.png",
      description:"Mercy Home provides a safe and caring environment for elderly individuals who have been abandoned or are in need of care.",
    },
    {
      title: "Baalika Bhavan",
      image: "/donation2.png",
      description: "Baalika Bhavan is committed to empowering young girls from disadvantaged backgrounds, where they can thrive.",
    },
    {
      title: "Teresa Home",
      image: "/donation3.png",
      description: "Teresa Home is inspired by the life and work of Mother Teresa, We provide care and support to the all those need us..",
    },
    {
      title: "Asha Bhavan",
      image: "/donation0.png",
      description: "Asha Bhavan is a non-profit organization dedicated to underprivileged children in rural areas.",
    },
    {
      title: "Mercy Home",
      image: "/donation3.png",
      description:"Mercy Home provides a safe and caring environment for elderly individuals who have been abandoned or are in need of care.",
    },
    {
      title: "Baalika Bhavan",
      image: "/donation2.png",
      description: "Baalika Bhavan is committed to empowering young girls from disadvantaged backgrounds, where they can thrive.",
    },
    {
      title: "Teresa Home",
      image: "/donation3.png",
      description: "Teresa Home is inspired by the life and work of Mother Teresa, We provide care and support to the all those need us..",
    },
    
   
  ];

  
  return (
    <div className="cardCompo d-flex flex-wrap" style={{ width: "90%" }} >
     {organizations.map((org, index) => (
      <div className="cardWrap px-3 py-3 d-flex flex-wrap">
        <Card key={index} style={{ width: "210px",height:"290px",boxShadow:'2px 3px 6px 4px grey' }} border="info" className="pt-2 mt-1 text-center card">
          <Card.Img variant="top" src={org.image} style={{ height: "35%", width: '100%'}} />
          <Card.Body>
            <Card.Title>{org.title}</Card.Title>
            <Card.Text>{org.description}</Card.Text>
          </Card.Body>
        </Card>
        </div>
      ))}
         
    </div>
  );
};

export default CustomCard;

