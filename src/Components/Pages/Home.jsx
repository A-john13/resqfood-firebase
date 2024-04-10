import React,{ useEffect,useState } from 'react'
import axios from 'axios'
import  Container from 'react-bootstrap/Container'
import NavBar from '../Reusable/Nav'
import CarouselCompo from '../Reusable/Carousel'
import CustomCard from '../Reusable/Card'
import { useFirebase } from '../../Config/firebase'
import { useNavigate } from 'react-router-dom'


import './CSS/Home.css'

const Home = () => {
        const nav = useNavigate();
         const [data, setData] = useState([]);
         const firebase=useFirebase();
  return (
    <div className='homePage'>
        <Container fluid className="p-0 m-0 navBar"  style={{width:'99dvw'}}>
            <NavBar userType={() => {}}/>
        </Container>

        <Container fluid className="p-0 m-0 d-flex justify-content-center carouselsSlider" sm={8} >
            
            <CarouselCompo/>

        </Container>

        <Container fluid className="p-4 content d-flex flex-wrap">

        <CustomCard/>
        
        </Container>
    </div>
  )
}

export default Home
