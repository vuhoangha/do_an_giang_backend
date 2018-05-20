var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const UserInfo = require('./src/user_info');
const Car = require('./src/car');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const util = require('./helper/util');

app.post('/user_info/register', function (req, res) {
    const userInfo = new UserInfo(req, res);
    userInfo.register();
});
app.post('/user_info/login', function (req, res) {
    const userInfo = new UserInfo(req, res);
    userInfo.login();
});
app.post('/user_car', function (req, res) {
    const car = new Car(req, res);
    car.add();
});
app.get('/user_car/get-my-car', function (req, res) {
    const car = new Car(req, res);
    car.getMyCar();
});

app.listen(3000);
