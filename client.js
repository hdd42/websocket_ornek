var socket = require('socket.io-client')('http://localhost:3000');
var urunler = require('./urunler').urunler

socket.on('connect', function(){
    console.log("socket baglantisi kuruldu");
});

socket.on('disconnect', function(){
    console.log("socket baglantisi kapatildi");
});

setInterval(()=>{
    var count = urunler.length;


    var urun =urunler[Math.floor((Math.random() * count) + 0)]
    console.log(urun)
    if(urun.stok > 10){
    urun.stok -=  Math.floor((Math.random() * 8) + 1)
        urun.fiyat =parseFloat(urun.fiyat - (urun.fiyat * Math.floor((Math.random() * 12) + 1)) / 100 ).toFixed(2)
    }else   {
        urun.stok +=  Math.floor((Math.random() * 4) + 1)
        urun.fiyat =parseFloat(urun.fiyat+ (urun.fiyat * Math.floor((Math.random() * 12) + 1)) / 100 ).toFixed(2)
    }


   console.log(urun)

  socket.emit('urunGuncelle',urun)
},5000)

