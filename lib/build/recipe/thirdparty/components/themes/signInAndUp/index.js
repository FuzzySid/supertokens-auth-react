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
var styleContext_1 = tslib_1.__importStar(require("../../../../../styles/styleContext"));
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../../../components/themes/styles");
var styles_3 = require("../../../../../styles/styles");
var signUpFooter_1 = require("./signUpFooter");
var themeBase_1 = require("../themeBase");
var providersForm_1 = require("./providersForm");
var SuperTokensBranding_1 = require("../../../../../components/SuperTokensBranding");
var __1 = require("../../../../..");
var generalError_1 = tslib_1.__importDefault(require("../../../../emailpassword/components/library/generalError"));
var userContextWrapper_1 = tslib_1.__importDefault(require("../../../../../usercontext/userContextWrapper"));
var SignInAndUpTheme = function (props) {
    var t = (0, __1.useTranslation)();
    var styles = (0, react_1.useContext)(styleContext_1.default);
    return (0, jsx_runtime_1.jsxs)(
        "div",
        tslib_1.__assign(
            { "data-supertokens": "container", css: styles.container },
            {
                children: [
                    (0, jsx_runtime_1.jsxs)(
                        "div",
                        tslib_1.__assign(
                            { "data-supertokens": "row", css: styles.row },
                            {
                                children: [
                                    (0, jsx_runtime_1.jsx)(
                                        "div",
                                        tslib_1.__assign(
                                            { "data-supertokens": "headerTitle", css: styles.headerTitle },
                                            { children: t("THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE") }
                                        )
                                    ),
                                    (0, jsx_runtime_1.jsx)("div", {
                                        "data-supertokens": "divider",
                                        css: styles.divider,
                                    }),
                                    props.featureState.error &&
                                        (0, jsx_runtime_1.jsx)(generalError_1.default, {
                                            error: props.featureState.error,
                                        }),
                                    (0, jsx_runtime_1.jsx)(providersForm_1.ProvidersForm, tslib_1.__assign({}, props)),
                                    (0, jsx_runtime_1.jsx)(signUpFooter_1.SignUpFooter, {
                                        privacyPolicyLink: props.config.signInAndUpFeature.privacyPolicyLink,
                                        termsOfServiceLink: props.config.signInAndUpFeature.termsOfServiceLink,
                                    }),
                                ],
                            }
                        )
                    ),
                    (0, jsx_runtime_1.jsx)(SuperTokensBranding_1.SuperTokensBranding, {}),
                ],
            }
        )
    );
};
var SignInAndUpThemeWrapper = function (props) {
    var hasFont = (0, styles_3.hasFontDefined)(props.config.rootStyle);
    return (0, jsx_runtime_1.jsx)(
        userContextWrapper_1.default,
        tslib_1.__assign(
            { userContext: props.userContext },
            {
                children: (0, jsx_runtime_1.jsx)(
                    themeBase_1.ThemeBase,
                    tslib_1.__assign(
                        { loadDefaultFont: !hasFont },
                        {
                            children: (0, jsx_runtime_1.jsx)(
                                styleContext_1.StyleProvider,
                                tslib_1.__assign(
                                    {
                                        rawPalette: props.config.palette,
                                        defaultPalette: styles_1.defaultPalette,
                                        styleFromInit: props.config.signInAndUpFeature.style,
                                        rootStyleFromInit: props.config.rootStyle,
                                        getDefaultStyles: styles_2.getStyles,
                                    },
                                    { children: (0, jsx_runtime_1.jsx)(SignInAndUpTheme, tslib_1.__assign({}, props)) }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
};
exports.default = SignInAndUpThemeWrapper;
