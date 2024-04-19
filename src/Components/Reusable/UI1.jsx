import React from 'react'
import './UI1.css'

const UI1 = () => {
  return (
    <div className="p-0 m-0  charity-container">
   
    <div className="p-0 mt-2 ui-container">
    <div className="ps-3 d-flex dot-pattern left-images">
      <img src="/childsmall4.jpg" alt="Image 1" style={{height:'180px',width:'150px',alignSelf:'start'}}/>
      <img src="/charity2.png" alt="Image 2" style={{width:'170px',height:'140px',alignSelf:'center'}} />
      {/* <img src="/donation1.png" alt="Image 2"  style={{alignSelf:'start'}}/> */}
    </div>
    
    <div className="right-image d-flex ">
      <img src="/homeless.png" alt="Big Image" />
    </div>
    
    <div className="p-5 making-difference">
      <h3 className=" ">Making a Difference with ResQFood</h3>
            <strong className="white">Feeding Hope,Together
            Find and support charities that align with your passions.</strong>
      {/* <input type="text" placeholder="Your input here" /> */}
    </div>
  </div>
  </div>
  )
}

export default UI1
