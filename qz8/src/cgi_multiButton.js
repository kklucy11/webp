
const changeText = (event) => {
    console.log(event.target)
    event.target.innerText = event.target.innerText + "被點了"
}
const multiButton = (num) => {
    var output = [];
    for (let i = 1; i < num + 1; ++i)
        output.push(<div id='btn' ><button>第{i}個按鍵</button></div>)
    document.querySelector('div').addEventListener('click',changeText)
    return output;
}
export default multiButton;