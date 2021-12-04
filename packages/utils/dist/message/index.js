"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
var createMessage = function (message, userName) {
    if (userName === void 0) { userName = 'anonymous'; }
    var date = Date.now();
    return ({ message: message, userName: userName, date: date });
};
exports.createMessage = createMessage;
//# sourceMappingURL=index.js.map