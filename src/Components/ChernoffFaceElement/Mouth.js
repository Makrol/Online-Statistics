function Mouth({ size, offsetX = 0, offsetY = 0, width = 80, height = 20 }) {
  const mouthPath =
    size === 1
      ? `M${offsetX} ${10 + offsetY+5} Q${width / 2 + offsetX} ${10 + height + offsetY+5}, ${width + offsetX} ${10 + offsetY+5}` // Smutny (krzywa w dół)
      : size === 2
      ? `M${offsetX} ${20 + offsetY} Q${width / 4 + offsetX} ${20 + offsetY}, ${width + offsetX} ${20 + offsetY}` // Neutralny (prosta linia)
      : size === 3
      ? `M${offsetX} ${20 + offsetY} Q${width / 4 + offsetX} ${20 + height + offsetY}, ${width / 2 + offsetX} ${20 + offsetY} T${width + offsetX} ${20 + offsetY}` // Pofalowany
      : `M${offsetX} ${30 + offsetY} Q${width / 2 + offsetX} ${30 - height + offsetY}, ${width + offsetX} ${30 + offsetY}`; // Uśmiechnięty (krzywa w górę)

  return (
    <path d={mouthPath} stroke="black" strokeWidth="2" fill="none" />
  );
}

export default Mouth;
