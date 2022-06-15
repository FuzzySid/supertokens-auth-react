"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefaultContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var SessionContext = react_1.default.createContext({
    loading: true,
    isDefault: true,
});
function isDefaultContext(sessionContext) {
    return sessionContext.isDefault;
}
exports.isDefaultContext = isDefaultContext;
exports.default = SessionContext;
