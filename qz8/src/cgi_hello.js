const styleArgument = { fontSize:'100px', color:'red' };
const HelloCGU = () => {
    var output = [];
    output.push(<div style={styleArgument}>Hello CGU!!!</div>)
    return output;
}
export default HelloCGU;