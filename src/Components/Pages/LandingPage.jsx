import React from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LandingCarousel } from "../Reusable/Carousel";
import NavBar from "../Reusable/Nav";
import "./CSS/LandingPage.css";
const LandingPage = () => {
  const nav = useNavigate();

  return (
    <Container fluid className="m-0 text-center landing-page">
      <> <NavBar></NavBar>
      </>
      <Container className="m-0 p-5 content">
        <Row>
          <Col>
            <h1 className="title">ResQFood</h1>
            
            <h1 className="title">Feeding Hope,Together</h1>
            <h5 className="subheadings">
              Discover surplus food,Feed those in need. Join us in making a
              difference, one meal at a time.
            </h5>
            <p className="p">
              Stop Food Waste, Start Saving Lives. Learn about the impact of
              food wastage and how you can make a difference.
            </p>
             
        <Row className="butons">
          <Button
            className="mx-3 getStarted"
            style={{ width: "40%" }}
            onClick={() => nav("/login")}>
            Get Started
          </Button>

          <Button
            className="xm-3 getStarted"
            style={{ width: "40%" }}
            onClick={() => nav("/")}>
            Learn More
          </Button>
        </Row>

          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="subheadings">Why It Matters</h2>
            <p className="p">
              Every year, millions of tons of edible food are wasted,
              contributing to environmental issues and hunger problems. By
              connecting excess food with those in need, we can reduce waste and
              feed more people.
            </p>
          </Col>
        </Row>
        
        <Container className="d-flex  justify-content-center carousel">
          <Row>
            <Col>
              <LandingCarousel />
            </Col>
          </Row>
        </Container>
       
        <Row>
          <Col>
            <h2 className="subheadings">Our Mission</h2>
            <p className="p">
              ResQFood aims to reduce food wastage by connecting donors with
              recipients through an easy-to-use platform. Together, we can make
              a difference, one meal at a time.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="subheadings">Get Involved</h2>
            <p className="p">
              You can help by donating excess food from events like weddings and
              engagements. By notifying us early, we can ensure that no food
              goes to waste.
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default LandingPage;
