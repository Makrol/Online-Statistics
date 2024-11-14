// ChernoffFace.js
import React from "react";

function ChernoffFace({ characteristics }) {
  const {
    eyes = 2,       // Wielkość oka (1 - małe, 2 - średnie, 3 - duże)
    smile = 2, // Szerokość uśmiechu (1 - smutny, 2 - neutralny, 3 - uśmiechnięty)
    nose = 2,      // Wielkość nosa (1 - mały, 2 - średni, 3 - duży)
    eyebrows = 2,           // Kąt brwi (1 - proste, 2 - lekko uniesione, 3 - wysoko uniesione)
    ears = 2       // Wielkość uszu (1 - małe, 2 - średnie, 3 - duże)
  } = characteristics;

  // Konfiguracje dla oczu
  const eyeOuterSize = eyes === 1 ? 6 : eyes === 2 ? 8 : 10;
  const eyeInnerSize = eyeOuterSize / 2;

  // Konfiguracje dla ust (długość oraz pozycja w zależności od typu uśmiechu)
  const mouthPath =
    smile === 1
      ? "M30 70 Q50 60, 70 70"   // Smutny (krzywa w dół)
      : smile === 2
      ? "M30 70 Q50 70, 70 70"   // Neutralny (prosta linia)
      : "M30 70 Q50 80, 70 70";  // Uśmiechnięty (krzywa w górę)

  // Wielkość nosa
  const noseWidth = nose === 1 ? 4 : nose === 2 ? 6 : 8;
  const noseHeight = nose === 1 ? 6 : nose === 2 ? 8 : 10;

  // Wielkość uszu
  const earSize = ears === 1 ? 10 : ears === 2 ? 12 : 14;

  // Kąt brwi
  const eyebrowAngle = eyebrows === 1 ? "0deg" : eyebrows === 2 ? "10deg" : "20deg";

  return (
    <svg width="120" height="100" viewBox="0 0 120 100">
      {/* Uszy */}
      <circle cx="15" cy="50" r={earSize} fill="peachpuff" stroke="black" strokeWidth="2" />
      <circle cx="85" cy="50" r={earSize} fill="peachpuff" stroke="black" strokeWidth="2" />

      {/* Twarz */}
      <circle cx="50" cy="50" r="40" fill="peachpuff" stroke="black" strokeWidth="2" />
      
      {/* Oczy */}
      {/* Lewe oko */}
      <circle cx="35" cy="40" r={eyeOuterSize} fill="white" stroke="black" strokeWidth="1" />
      <circle cx="35" cy="40" r={eyeInnerSize} fill="black" />
      
      {/* Prawe oko */}
      <circle cx="65" cy="40" r={eyeOuterSize} fill="white" stroke="black" strokeWidth="1" />
      <circle cx="65" cy="40" r={eyeInnerSize} fill="black" />

      {/* Brwi */}
      <rect
        x="25"
        y="30"
        width="20"
        height="3"
        fill="black"
        transform={`rotate(${eyebrowAngle})`}
      />
      <rect
        x="55"
        y="30"
        width="20"
        height="3"
        fill="black"
        transform={`rotate(-${eyebrowAngle})`}
      />

      {/* Nos */}
      <rect
        x={50 - noseWidth / 2}
        y="50"
        width={noseWidth}
        height={noseHeight}
        fill="black"
      />

      {/* Usta */}
      <path d={mouthPath} stroke="black" strokeWidth="2" fill="none" />
    </svg>
  );
}

export default ChernoffFace;
