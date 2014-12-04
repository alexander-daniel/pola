'use strict';

var express = require('express');
var swig = require('swig');
var app = require('express.io')();
app.http().io();
var fs = require('fs');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.render('index', {
        title: 'pola pola pola'
    });
});

app.get('/~*', function (req, res){
    var url = req.url;
    res.render('pola', {
        title: url
    });

    app.io.route('ready', function(req) {   
        req.io.join(url);
        req.io.room(url).broadcast('new visitor');
        console.log('broadcasted new visitor', url);
    });

    app.io.route('snapshot', function(req) {
        app.io.room(url).broadcast('newshapshot', req.data);
        console.log('image received');
        var stamp = new Date();
        var buf = new Buffer(req.data, 'base64');
        var date = stamp.getDate();
        var month = stamp.getMonth() + 1;
        var year = stamp.getFullYear();
        var ms = stamp.getMilliseconds().toString();
        var urlSplit = url.split('~')[1];
        var fileName = 'images/' + urlSplit + '-' + date + '-' + month + '-' + year + '-' + ms + '.png';
        fs.writeFile(fileName, buf);
    });
});

app.listen(8080);
