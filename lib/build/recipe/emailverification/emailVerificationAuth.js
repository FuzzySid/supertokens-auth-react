"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
var react_1 = tslib_1.__importStar(require("react"));
var session_1 = require("../session");
var usercontext_1 = require("../../usercontext");
var userContextWrapper_1 = tslib_1.__importDefault(require("../../usercontext/userContextWrapper"));
var utils_1 = require("../../utils");
var EmailVerificationAuth = function (_a) {
    var children = _a.children,
        props = tslib_1.__rest(_a, ["children"]);
    var sessionContext = (0, react_1.useContext)(session_1.SessionContext);
    var _b = (0, react_1.useState)(false),
        isEmailVerified = _b[0],
        setIsEmailVerified = _b[1];
    // we extract these three this way so that the useEffect below
    // doesn't rerun just because the sessionContext or props objects
    // have changed, even though the doesSessionExist & emailVerificationMode
    // have not.
    var doesSessionExist = sessionContext.doesSessionExist;
    var emailVerificationMode = props.recipe.config.mode;
    var propsRef = react_1.default.useRef(props);
    var userContext = (0, usercontext_1.useUserContext)();
    var checkIsEmailVerified = (0, react_1.useCallback)(
        function () {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(doesSessionExist && emailVerificationMode === "REQUIRED")) return [3 /*break*/, 2];
                            return [4 /*yield*/, propsRef.current.recipe.isEmailVerified(userContext)];
                        case 1:
                            return [2 /*return*/, _a.sent().isVerified];
                        case 2:
                            return [2 /*return*/, undefined];
                    }
                });
            });
        },
        [doesSessionExist, emailVerificationMode]
    );
    var useIsEmailVerified = (0, react_1.useCallback)(
        function (isEmailVerified) {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(doesSessionExist && emailVerificationMode === "REQUIRED")) return [3 /*break*/, 3];
                            if (!(isEmailVerified === false)) return [3 /*break*/, 2];
                            return [
                                4 /*yield*/,
                                propsRef.current.recipe.redirect({ action: "VERIFY_EMAIL" }, propsRef.current.history),
                            ];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            setIsEmailVerified(true);
                            _a.label = 3;
                        case 3:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [doesSessionExist, emailVerificationMode]
    );
    (0, utils_1.useOnMountAPICall)(checkIsEmailVerified, useIsEmailVerified);
    if (sessionContext.doesSessionExist === false) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    if (props.recipe.config.mode !== "REQUIRED") {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    return isEmailVerified ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }) : null;
};
var EmailVerificationAuthWrapper = function (props) {
    return (0, jsx_runtime_1.jsx)(
        userContextWrapper_1.default,
        tslib_1.__assign(
            { userContext: props.userContext },
            { children: (0, jsx_runtime_1.jsx)(EmailVerificationAuth, tslib_1.__assign({}, props)) }
        )
    );
};
exports.default = EmailVerificationAuthWrapper;
