import "./deny2.css";
import React from "react";

const Deny2 = () => {
    
  return (
    <>
    <div className="p-0 m-0 container">
   
      <div className="p-0 mx-5 ui-container">
      <div className="ps-3 d-flex dot-pattern left-images">
        <img src="/childsmall4.jpg" alt="Image 1" style={{height:'180px',width:'150px',alignSelf:'start'}}/>
        <img src="/charity2.png" alt="Image 2" style={{width:'170px',height:'140px',alignSelf:'center'}} />
        {/* <img src="/donation1.png" alt="Image 2"  style={{alignSelf:'start'}}/> */}
      </div>
      
      <div className="right-image d-flex justify-content-end">
        <img src="/homeless.png" alt="Big Image" />
      </div>
      
      <div className="making-difference">
        <p>Making a Difference</p>
        <input type="text" placeholder="Your input here" />
      </div>
    </div>
    </div>
    </>
  );
};

export default Deny2;
