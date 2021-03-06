"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ws_server_js_1 = __importDefault(require("./ws/ws_server.js"));
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.static('packages/app/dist'));
app.get('/', function (req, res) {
    res.sendFile('packages/app/dist/index.html', { root: '.' });
});
console.log("running on port ".concat(port));
(0, ws_server_js_1.default)();
app.listen(port);
//# sourceMappingURL=index.js.map