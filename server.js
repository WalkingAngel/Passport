var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendfile('index.html');
})

app.post('/login', function(req, res) {
    console.log('Login Process Starting');
    res.send('Loading...');
})

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
})