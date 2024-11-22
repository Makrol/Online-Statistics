import { Fragment } from "react";

function Eyebrows({ size }) {
  const eyebrowAngle = size === 1 ? "0" : size === 2 ? "10" : size === 3 ? "20" : "40";

  return (
    <Fragment>
      <rect
        x="25"
        y="30"
        width="20"
        height="3"
        fill="black"
        transform={`rotate(${eyebrowAngle}, 35, 31.5)`} // Punkt obrotu: środek prostokąta
      />
      <rect
        x="55"
        y="30"
        width="20"
        height="3"
        fill="black"
        transform={`rotate(-${eyebrowAngle}, 65, 31.5)`} // Punkt obrotu: środek prostokąta
      />
    </Fragment>
  );
}

export default Eyebrows;
