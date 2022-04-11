"use strict";
const express = require('express');
const request = require('request');
const fs = require('fs');
var app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.set('content-type', 'application/json')
  next();
});

app.get('/', (req, res) => {
  res.redirect('https://cryptodepot.org/coinbin/')
});

app.get('/votingbooth/1', (req, res) => {
  res.set('Content-Type', 'text/html');
    request(
     { url: 'https://pnddev.digitalpandacoin.org:5555/restless/v1/balances?q=%7B%22filters%22:[%7B%22name%22:%22account%22,%22op%22:%22like%22,%22val%22:%22P8mQQqQbymmR99zUb4ZnvRyxcEQMYhurHe%%22%7D]%7D'},
     (error, response, body) => {
       if (error || response.statusCode !== 200) {
         return res.status(500).json({ type: 'error', message: error });
       }
       var info = JSON.parse(body);
       res.write('<!DOCTYPE html><html><head><title>Pandacoin Peer Asset - Voting Booth</title></head><body><div style="margin:0 auto;text-align:center;width:50%;"><div>Pandacoin Peer Asset Votes<br>Experimenting with Pandacoin peer asset voting<br>Does Voting with Pandacoin peer assets seem like a good idea?<br>Send a peer asset Votes Tokens to one of the following pandacoin addresses to vote.<br>For Yes send to: P8mQQqQbymmR99zUb4ZnvRyxcEQMYhurHe<br>For No send to: PNm95MJ9pGye7B4hAJKHVjX4fuWWEUik1R<br></div></div><div style="margin:0 auto;width:50%;"><div style="text-align:center;float:left;">P8mQQqQbymmR99zUb4ZnvRyxcEQMYhurHe</br> Yes Votes Tokens Count:' + info.objects[0].value + '</div>');
     }
   )

   request(
     { url: 'https://pnddev.digitalpandacoin.org:5555/restless/v1/balances?q=%7B%22filters%22:[%7B%22name%22:%22account%22,%22op%22:%22like%22,%22val%22:%22PNm95MJ9pGye7B4hAJKHVjX4fuWWEUik1R%%22%7D]%7D'},
     (error, response, body) => {
       if (error || response.statusCode !== 200) {
         return res.status(500).json({ type: 'error', message: error });
       }
       var info = JSON.parse(body);
       console.log(info);
       res.write('<div style="text-align:center; float: right;">PNm95MJ9pGye7B4hAJKHVjX4fuWWEUik1R </br> No Votes Tokens Count: ' + info.objects[0].value + '</div></div></body></html>');
       res.end();
     }
   )
 });

//  Status Indication
  app.get('/status', (req, res) => {
    res.send('true');
  });

module.exports = app;
