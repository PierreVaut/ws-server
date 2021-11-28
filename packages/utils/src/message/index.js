"use strict";
exports.__esModule = true;
exports.createMessage = void 0;
exports.createMessage = function (message, userName) {
    if (userName === void 0) { userName = 'anonymous'; }
    var date = Date.now();
    return ({ message: message, userName: userName, date: date });
};
