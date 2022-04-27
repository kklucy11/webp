setInterval(function(){
    var today = new Date();
    let hr=today.getHours(),min=today.getMinutes(),s=today.getSeconds();
    if(hr<10&&min<10&&s<10){$("#demo").text("0"+hr+":0"+min+":0"+s);}
    else if(hr<10&&min<10){$("#demo").text("0"+hr+":0"+min+":"+s);}
    else if(s<10&&min<10){$("#demo").text(hr+":0"+min+":0"+s);}
    else if(hr<10&&s<10){$("#demo").text("0"+hr+":"+min+":0"+s);}
    else if(hr<10){$("#demo").text("0"+hr+":"+min+":"+s);}
    else if(s<10){$("#demo").text(hr+":"+min+":0"+s);}
    else if(min<10){$("#demo").text(hr+":0"+min+":"+s);}
    else{$("#demo").text(hr+":"+min+":"+s);}
}, 1000);