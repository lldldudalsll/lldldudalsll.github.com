(function(global){
    'use strict';

    var data = document.querySelector('i').attributes[0].nodeValue
    // console.log(data);
    
    var arrayData = data.split(',')
    // console.log(arrayData);

    // var a = Math.floor(Math.random()*arrayData.length)
    // console.log(a);
    
    var count = function(){
        setTimeout(function() {
            document.querySelector('i').innerHTML = arrayData[0];
        }, 0);
        setTimeout(function() {
            document.querySelector('i').innerHTML = arrayData[1];
        }, 4000);
        setTimeout(function() {
            document.querySelector('i').innerHTML = arrayData[2];
        }, 8000);
        setTimeout(function() {
            document.querySelector('i').innerHTML = arrayData[3];
        }, 12000);
        setTimeout(function() {
            document.querySelector('i').innerHTML = arrayData[4];
        }, 150000);
        setTimeout(function() {
            document.querySelector('i').innerHTML = arrayData[5];
        }, 18000);
    }

    setInterval(function(){ count(); }, 20000);
    count();

}(window));