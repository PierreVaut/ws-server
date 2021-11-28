"use strict";
exports.__esModule = true;
var express_1 = require("express");
var ws_server_js_1 = require("./ws/ws_server.js");
var app = express_1["default"]();
var port = 3000;
app.use(express_1["default"].static('packages/app/build'));
app.get('/', function (req, res) {
    res.sendFile('packages/app/build/index.html', { root: '.' });
});
console.log("running on port " + port);
ws_server_js_1["default"]();
app.listen(port);
