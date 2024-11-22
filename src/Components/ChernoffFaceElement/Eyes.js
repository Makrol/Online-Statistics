import { Fragment } from "react";

function Eyes({ size, posX1, posY1, posX2, posY2 }) {
  const eyeOuterSize = size === 1 ? 6 : size === 2 ? 8 : size === 3 ? 10 : 15;
  const eyeInnerSize = eyeOuterSize / 2;
  return (
    <Fragment>
      <circle
        cx={posX1}
        cy={posY1}
        r={eyeOuterSize}
        fill="white"
        stroke="black"
        strokeWidth="1"
      />
      <circle cx={posX1} cy={posY1} r={eyeInnerSize} fill="black" />

      <circle
        cx={posX2}
        cy={posY2}
        r={eyeOuterSize}
        fill="white"
        stroke="black"
        strokeWidth="1"
      />
      <circle cx={posX2} cy={posY2} r={eyeInnerSize} fill="black" />
    </Fragment>
  );
}
export default Eyes;
