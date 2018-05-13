var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const UserInfo = require('./src/user_info');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const util = require('./helper/util');

app.post('/user_info/register', function (req, res) {
    if (!req || !req.body) res.sendStatus(400);
    const data = req.body.data;
    const userinfo = new UserInfo();
    userinfo.register(data.user_name, data.password, isSuccess => {
        if (isSuccess == true) return res.sendStatus(200);
        return res.sendStatus(400);
    });
});
app.post('/user_info/login', function (req, res) {
    if (!req || !req.body) res.sendStatus(400);
    const data = req.body.data;
    const userinfo = new UserInfo();
    userinfo.login(data.user_name, data.password, data => {
        if (data != null && data.length > 0) {
            return util.signToken(data.user_name, token => {
                res.send(token);
            });
        }
        return res.sendStatus(400);
    });
});

app.listen(3000);
