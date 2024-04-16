import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Carousel.css'

const CarouselCompo = () => {
  return (
    <div className="py-3 ImageSlider" style={{maxWidth:'600px',height:'420px'}}>
              
      <Carousel data-bs-theme="dark">
        <Carousel.Item  >
          <img
            style={{objectFit:'cover',}}
            className="custom-image"
            src="/donation0.png"
            alt="Image Not Found "
           
          />
        </Carousel.Item>
        <Carousel.Item  >
          <img
            style={{objectFit:'cover',}}
            className="custom-image"
            src="/donation010.png"
            alt="Image Not Found "
          />
        </Carousel.Item>
        <Carousel.Item >
          <img
            style={{objectFit:'cover', }}
            className="d-block custom-image"
            src="/donation2.png"
            alt="Image Not Found "
          />
        </Carousel.Item>
        <Carousel.Item >
          <img
            style={{objectFit:'cover', }}
            className="d-block w-100 custom-image"
            src="\donation3.png"
            alt="Image Not Found "
          />
        </Carousel.Item>
      </Carousel>


      
    </div>
  );
};


const images= [
  "LogoBlack.png",
  "donation0.png",
  "ideogram.jpg",
  "ML.png",
  "orphanage1.jpg",
  "closefood-jar.jpg",
  "donation01000.png",
  "food.jpg",
  "donation2.png",
];


export const LandingCarousel = () => {
  return (
    <div className="py-3 Slider" style={{ maxWidth: '600px', height: '420px' }}>
      <Carousel interval={1000} prevIcon={<FaChevronLeft />} nextIcon={<FaChevronRight />} data-bs-theme="dark">
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              style={{ objectFit: 'cover' }}
              className="custom-image"
              src={image}
              alt="Image Not Found"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};


export default CarouselCompo;
