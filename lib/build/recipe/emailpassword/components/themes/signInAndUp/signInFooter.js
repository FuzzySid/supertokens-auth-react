"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInFooter = void 0;
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
var styleContext_1 = tslib_1.__importDefault(require("../../../../../styles/styleContext"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
exports.SignInFooter = (0, withOverride_1.withOverride)(
    "EmailPasswordSignInFooter",
    function EmailPasswordSignInFooter(_a) {
        var onClick = _a.onClick;
        var styles = (0, react_1.useContext)(styleContext_1.default);
        var t = (0, translationContext_1.useTranslation)();
        return (0, jsx_runtime_1.jsx)(
            "div",
            tslib_1.__assign(
                {
                    "data-supertokens": "link secondaryText forgotPasswordLink",
                    css: [styles.link, styles.secondaryText, styles.forgotPasswordLink],
                    onClick: onClick,
                },
                { children: t("EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK") }
            )
        );
    }
);
