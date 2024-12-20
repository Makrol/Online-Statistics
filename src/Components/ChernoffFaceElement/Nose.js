function Nose({ size, posX,posY }) {
  const noseWidth = size === 1 ? 4 : size === 2 ? 6 : size === 3 ? 8 : 10;
  const noseHeight = size === 1 ? 6 : size === 2 ? 10 : size ===3 ? 12 :16;
  return (
      <rect
        x={posX - noseWidth / 2}
        y={posY}
        width={noseWidth}
        height={noseHeight}
        fill="black"
      />
  );
}
export default Nose;
