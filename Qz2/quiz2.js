function change() {
    var header = document.getElementById("B0929029");
    header.innerHTML = "CSIE@CGU";

    var para = document.getElementById("gd");
    para.innerHTML = "怎麼那麼棒！！.";
  }
  function myFunction() {
    var btn = document.createElement("button");
    btn.innerHTML = "CLICK ME";
    btn.setAttribute("id", "btn");
    document.body.appendChild(btn);
  }