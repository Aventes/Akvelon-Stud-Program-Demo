const http = require('http');
const express = require('express');
const testProducts = require('./src/testData/index.json');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', function (req, res) {
    res.send("index.html");
})

app.get('/products', function (req, res, next) {
    res.header("Content-Type", 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(testProducts));
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(cors());
app.options('*', cors());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});