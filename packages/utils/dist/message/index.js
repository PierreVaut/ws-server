"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMessage = exports.createMessage = exports.loginKey = void 0;
exports.loginKey = "$iShouldMakeTheLoginAbitSafer";
exports.createMessage = function (message, userName) {
    if (userName === void 0) { userName = 'anonymous'; }
    var date = Date.now();
    return ({ message: message, userName: userName, date: date });
};
exports.loginMessage = function (userName) {
    var date = Date.now();
    return ({ message: exports.loginKey, userName: userName, date: date });
};
//# sourceMappingURL=index.js.map