"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperTokensWrapper = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var userContextWrapper_1 = tslib_1.__importDefault(require("../../usercontext/userContextWrapper"));
var sessionAuth_1 = tslib_1.__importDefault(require("./sessionAuth"));
var SuperTokensWrapper = function (props) {
    return (0, jsx_runtime_1.jsx)(
        userContextWrapper_1.default,
        tslib_1.__assign(
            { userContext: props.userContext },
            { children: (0, jsx_runtime_1.jsx)(sessionAuth_1.default, tslib_1.__assign({}, props)) }
        )
    );
};
exports.SuperTokensWrapper = SuperTokensWrapper;
