import { Fragment } from "react";

function Ears({ size, posX1, posY1, posX2, posY2 }) {
  const earSize = size === 1 ? 10 : size === 2 ? 12 : 14;

  return (
    <Fragment>
      <circle
        cx={posX1}
        cy={posY1}
        r={earSize}
        fill="peachpuff"
        stroke="black"
        strokeWidth="2"
      />
      <circle
        cx={posX2}
        cy={posY2}
        r={earSize}
        fill="peachpuff"
        stroke="black"
        strokeWidth="2"
      />
    </Fragment>
  );
}
export default Ears;
