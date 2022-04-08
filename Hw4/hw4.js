var startTime = 0;
var endTime = 0;
var intervalTime = 0;
var calculateTime = 0;
var outputnumber = 0;
var myimages = new Array();
myimages = [' id="A"src=image/A.png>', ' id="B" src=image/B.png>', ' id="C" src=image/C.png>', ' id="D" src=image/D.png>', ' id="E" src=image/E.png>', ' id="F" src=image/F.png>', ' id="G" src=image/G.png>', ' id="H" src=image/H.png>', ' id="I" src=image/I.png>', ' id="J" src=image/J.png>', ' id="K" src=image/K.png>', ' id="L" src=image/L.png>', ' id="M" src=image/M.png>', ' id="N" src=image/N.png>', ' id="O" src=image/O.png>', ' id="P" src=image/P.png>', ' id="Q" src=image/Q.png>', ' id="R" src=image/R.png>', ' id="S" src=image/S.png>', ' id="T" src=image/T.png>', ' id="U" src=image/U.png>', ' id="V" src=image/V.png>', ' id="W" src=image/W.png>', ' id="X" src=image/X.png>', ' id="Y" src=image/Y.png>', ' id="Z" src=image/Z.png>'];
Alphabt = ["#A", "#B", "#C", "#D", "#E", "#F", "#G", "#H", "#I", "#J", "#K", "#L", "#M", "#N", "#O", "#P", "#Q", "#R", "#S", "#T", "#U", "#V", "#W", "#X", "#Y", "#Z"];
Road = ["#road1", "#road2", "#road3", "#road4", "#road5", "#road6"];
RoadClass = ['<img class=R1', '<img class=R2', '<img class=R3', '<img class=R4', '<img class=R5', '<img class=R6'];
$(document).ready(function () {
    $(document).keydown(Time);
    $(document).keydown(function (key) {
        randomnumber();
        deletechar(key.keyCode - 65);
    });
    var clock = setInterval(function () {
        if (($("img").filter(".R1").last().offset().left) >= 1257||($("img").filter(".R2").last().offset().left) >= 1257||($("img").filter(".R3").last().offset().left) >= 1257||($("img").filter(".R4").last().offset().left) >= 1257||($("img").filter(".R5").last().offset().left) >= 1257||($("img").filter(".R6").last().offset().left) >= 1257 ){
            alert("GameOver")
            clearInterval(clock);
            return 0;
        }
        $("img").filter(".R1").animate({ left: "+=30px" });
        $("img").filter(".R2").animate({ left: "+=25px" });
        $("img").filter(".R3").animate({ left: "+=18px" });
        $("img").filter(".R4").animate({ left: "+=23px" });
        $("img").filter(".R5").animate({ left: "+=20px" });
        $("img").filter(".R6").animate({ left: "+=12px" });
    }, 1000);
});
function Time() {
    startTime = new Date();
    if (endTime != startTime && endTime != 0) {
        intervalTime = startTime - endTime;
    }
    endTime = startTime;
    calculateTime = intervalTime + calculateTime;
    if (calculateTime > 667) {
        outputnumber = Math.floor(calculateTime / 667);
        calculateTime = calculateTime - outputnumber * 667;
    }
    else {
        outputnumber = 0;
    }
}
function randomnumber() {
    for (var i = 0; i < outputnumber; i++) {
        for (var j = 0; j < 6; j++) { $(Road[j]).prepend(RoadClass[j] + myimages[Math.floor(Math.random() * 26)]); }
        $("img").animate({ left: "+=80px" });
    }
}

function deletechar(key) {
    var roadnumber = 0;
    var exist = 0;
    while (roadnumber < 26) {
        if (($(Road[roadnumber]).children(Alphabt[key]).index() == -1) || ($(Road[roadnumber]).children(Alphabt[key]).index() == 0)) { roadnumber++; }
        else { exist = 1; break; }
    }
    if (exist) { deleteAlphabet(Road[roadnumber], Alphabt[key]); }
}
function deleteAlphabet(road, alphabt) {
    $(road).children(alphabt).last().remove();
}