"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importStar(require("ws"));
var utils_1 = require("@ws-server/utils");
var ws_server = function () {
    var wss = new ws_1.WebSocketServer({ port: 8080, clientTracking: true });
    console.log('wss start !');
    wss.on('connection', function (ws) {
        ws.on('message', function (data, isBinary) {
            console.log("message :" + data);
            if (("" + data).toLowerCase().includes('greet')) {
                ws.send(JSON.stringify(utils_1.createMessage('Hello from server !', 'server')));
            }
            else {
                wss.clients.forEach(function (client) {
                    if (client !== ws && client.readyState === ws_1.default.OPEN) {
                        client.send(data, { binary: isBinary });
                    }
                });
            }
        });
    });
};
exports.default = ws_server;
//# sourceMappingURL=ws_server.js.map