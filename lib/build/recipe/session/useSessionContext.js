"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var sessionContext_1 = tslib_1.__importDefault(require("./sessionContext"));
var useSessionContext = function () {
    var ctx = react_1.default.useContext(sessionContext_1.default);
    if (ctx.isDefault) {
        throw new Error("Cannot use useSessionContext outside auth components.");
    }
    return ctx;
};
exports.default = useSessionContext;
