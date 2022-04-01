var enter = document.getElementById('enter');
document.addEventListener('keydown', logkey);
function logkey(a) {
    if (65 <= a.keyCode && a.keyCode <= 112) {
        enter.textContent += `${a.keyCode}`;
    }
}