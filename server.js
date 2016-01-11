var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
var socketBaglanti;
io.on('connection', function (socket) {

    console.log(`
    Yeni bir istemci baglandi : ${socket.id}
    `)
    socketBaglanti = socket;
});


server.listen(3000, function () {
    console.log('Web sunucu port 3000 de calismakta!');
})

var urunler = [
    {
        "isim": "Televizyon",
        "fiyat": "12.25",
        "stok": 10
    },
    {
        "isim": "Laptop",
        "fiyat": "30",
        "stok": 5
    }]
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.get('/urunler', function (req, res) {
    res.status(200).send(urunler);
});
app.post('/urunler', function (req, res) {
    var yeniUrun = req.body.urun;
    urunler.push(yeniUrun);

    var socketData = JSON.stringify({data: yeniUrun, istemci: req.body.istemci})

    io.emit('yeniUrun', socketData);

    res.status(200).send("Urun Eklendi");

});
app.post('/urunSil', function (req, res) {
    var Urun = req.body.urun;

    urunler.forEach(function (item, index) {
        if (Urun == item.isim) {
            urunler.splice(index, 1);
        }
    })

   var socketData = JSON.stringify({data: Urun, istemci: req.body.istemci})
    io.emit('sil', socketData);
    res.status(200).send("Urun Silindi");

});
