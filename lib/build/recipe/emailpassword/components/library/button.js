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
/*
 * Imports.
 */
var react_1 = require("react");
var __1 = require("../../../..");
var styleContext_1 = tslib_1.__importDefault(require("../../../../styles/styleContext"));
/*
 * Component.
 */
function Button(_a) {
    var type = _a.type,
        label = _a.label,
        disabled = _a.disabled,
        isLoading = _a.isLoading,
        onClick = _a.onClick;
    var t = (0, __1.useTranslation)();
    var styles = (0, react_1.useContext)(styleContext_1.default);
    if (disabled === undefined) {
        disabled = false;
    }
    return (0, jsx_runtime_1.jsxs)(
        "button",
        tslib_1.__assign(
            { type: type, disabled: disabled, onClick: onClick, css: styles.button, "data-supertokens": "button" },
            { children: [t(label), isLoading && "..."] }
        )
    );
}
exports.default = Button;
