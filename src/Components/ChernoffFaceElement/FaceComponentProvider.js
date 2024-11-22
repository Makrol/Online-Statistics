function FaceComponentProvider({children,xSize,ySize})
{
    return(
        <svg width={xSize} height={ySize} viewBox={"0 0 "+ xSize+" "+ySize}>
            {children}
        </svg>
    )
}
export default FaceComponentProvider;