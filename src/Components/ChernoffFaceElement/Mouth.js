function Mouth({ size }) {
  const mouthPath =
    size === 1
      ? "M0 10 Q40 40, 80 10" // Smutny (krzywa w dół)
      : size === 2
      ? "M0 20 Q20 20, 80 20" // Neutralny (prosta linia)
      : "M0 30 Q40 0, 80 30"; // Uśmiechnięty (krzywa w górę)
/*const mouthPath =
    size === 1
      ? "M30 70 Q50 60, 70 70" // Smutny (krzywa w dół)
      : size === 2
      ? "M30 70 Q50 70, 70 70" // Neutralny (prosta linia)
      : "M30 70 Q50 80, 70 70"; // Uśmiechnięty (krzywa w górę)
 */
  return (
      <path d={mouthPath} stroke="black" strokeWidth="2" fill="none" />
  );
}
export default Mouth;
