var key = document.getElementById('key');
document.addEventListener('keydown', logkey);
function logkey(a) {
    if (65 <= a.keyCode && a.keyCode <= 112) {
        log.textContent += `${a.key}`;
    }
}