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
var react_1 = require("react");
var translationContext_1 = require("../../../../translation/translationContext");
var styleContext_1 = tslib_1.__importDefault(require("../../../../styles/styleContext"));
function InputError(_a) {
    var error = _a.error;
    var styles = (0, react_1.useContext)(styleContext_1.default);
    var t = (0, translationContext_1.useTranslation)();
    return (0, jsx_runtime_1.jsx)(
        "div",
        tslib_1.__assign(
            { "data-supertokens": "inputErrorMessage", css: styles.inputErrorMessage },
            { children: t(error) }
        )
    );
}
exports.default = InputError;
