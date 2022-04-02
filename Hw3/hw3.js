var enter = document.getElementById('key');
var first = 1;
var array = [];
document.onkeydown = function (event) {
    if (first == 1) {
        var clock = setInterval(randomnumber, 400);
        function randomnumber() {
            number = Math.floor(Math.random() * 26) + 65;
            array.unshift(`${String.fromCharCode(number)}`);
            enter.textContent = `打字機比賽:`;
            for (var i = 0; i < array.length; i++) { enter.textContent += array[i]; }
        }
        first = 0;
    }
}
document.addEventListener('keydown', keyIN);
function keyIN(a) {
    var index = array.lastIndexOf(`${a.key}`);
    if (index != -1) {
        delete array[index];
        for (var i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
        array.pop();
        enter.textContent = `打字機比賽:`;
        for (var i = 0; i < array.length; i++) { enter.textContent += array[i]; }
    }
}