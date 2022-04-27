
var data1 = '{"data": [' +
    '{ "stationNo": "C0AD1",'+
            '"stationName": "八里",'+
            '"recTime": "202204271600",'+
            '"rain": 0'+
       ' },'+
        '{'+
            '"stationNo": "C0AD0",'+
            '"stationName": "三芝",'+
            '"recTime": "202204271600",'+
            '"rain": 0'+
        '},'+
        '{'+
            '"stationNo": "C0AD4",'+
           ' "stationName": "土城",'+
            '"recTime": "202204271600",'+
            '"rain": 0'+
        '},'+
        '{'+
            '"stationNo": "318",'+
            '"stationName": "大安福州山",'+
            '"recTime": "202204271602",'+
            '"rain": 0'+
        '},'+
        '{'+
            '"stationNo": "01A17",'+
            '"stationName": "坪林",'+
            '"recTime": "201911130140",'+
            '"rain": 0'+
        '}]}';
var obj = JSON.parse(data1);
console.log(obj.data[0].stationName);
console.log(123);

    for (var i = 0; i < 5; i++)
    {
        console.log(obj.data[i].stationName);
        $('body').append($('<h2>'+obj.data[i].stationName+'('+obj.data[i].stationNo+')'+'</h2>'));
        $('body').append($('<h3>' + obj.data[i].recTime.substring(0, 4) + '年' + obj.data[i].recTime.substring(4, 6) + '月' + obj.data[i].recTime.substring(6, 8) + '號' + obj.data[i].recTime.substring(8, 10) + '時'+obj.data[i].recTime.substring(10, 12) + '</h3>'));
        $('body').append($('<h3>即時雨量'+obj.data[i].rain+'</h3>'));
    }
    
