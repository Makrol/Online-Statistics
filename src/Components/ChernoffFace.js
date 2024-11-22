// ChernoffFace.js
import React from "react";
import Ears from "./ChernoffFaceElement/Ears";
import Eyes from "./ChernoffFaceElement/Eyes";
import Eyebrows from "./ChernoffFaceElement/Eyebrows";
import Nose from "./ChernoffFaceElement/Nose";
import Mouth from "./ChernoffFaceElement/Mouth";

function ChernoffFace({ characteristics }) {
  const {
    eyes = 2,   
    smile = 2,
    nose = 2,   
    eyebrows = 2,       
    ears = 2       
  } = characteristics;

  return (
    <svg width="120" height="100" viewBox="0 0 120 100">
      {/* Uszy */}
      <Ears posX1={15} posY1={50} posX2={85} posY2={50} size={characteristics.ears}/>

      {/* Twarz */}
      <circle cx="50" cy="50" r="40" fill="peachpuff" stroke="black" strokeWidth="2" />
      
      {/* Oczy */}
      <Eyes posX1={35} posY1={40} posX2={65} posY2={40} size={characteristics.eyes}/>

      {/* Brwi */}
      <Eyebrows size={characteristics.eyebrows}/>

      {/* Nos */}
      <Nose posX={50} posY={50} size={characteristics.nose}/>

      {/* Usta */}
      <Mouth size={characteristics.smile} offsetX={25} offsetY={45} width={50} height={20}/>
    </svg>
  );
}

export default ChernoffFace;
