import { Fragment } from "react";

function Eyebrows({ size }) {
  const eyebrowAngle = size === 1 ? "0deg" : size === 2 ? "10deg" : "20deg";

  return (
    <Fragment>
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
    </Fragment>
  );
}
export default Eyebrows;