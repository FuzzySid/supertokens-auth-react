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
var React = tslib_1.__importStar(require("react"));
var header_1 = require("./header");
var styleContext_1 = tslib_1.__importStar(require("../../../../../styles/styleContext"));
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../styles");
var signInUp_1 = require("../../../../passwordless/components/themes/signInUp");
var themeBase_1 = require("../themeBase");
var __1 = require("../../../../..");
var generalError_1 = tslib_1.__importDefault(require("../../../../emailpassword/components/library/generalError"));
var providersForm_1 = require("../../../../thirdparty/components/themes/signInAndUp/providersForm");
var closeTabScreen_1 = require("../../../../passwordless/components/themes/signInUp/closeTabScreen");
var linkSent_1 = require("../../../../passwordless/components/themes/signInUp/linkSent");
var userInputCodeFormHeader_1 = require("../../../../passwordless/components/themes/signInUp/userInputCodeFormHeader");
var SuperTokensBranding_1 = require("../../../../../components/SuperTokensBranding");
var userInputCodeForm_1 = require("../../../../passwordless/components/themes/signInUp/userInputCodeForm");
var emailOrPhoneForm_1 = require("../../../../passwordless/components/themes/signInUp/emailOrPhoneForm");
var phoneForm_1 = require("../../../../passwordless/components/themes/signInUp/phoneForm");
var emailForm_1 = require("../../../../passwordless/components/themes/signInUp/emailForm");
var SignInUpTheme = function (props) {
    var t = (0, __1.useTranslation)();
    var styles = React.useContext(styleContext_1.default);
    if (props.activeScreen === signInUp_1.SignInUpScreens.CloseTab) {
        return (0, jsx_runtime_1.jsx)(closeTabScreen_1.CloseTabScreen, tslib_1.__assign({}, props.pwlessChildProps));
    } else if (props.activeScreen === signInUp_1.SignInUpScreens.LinkSent) {
        return (0, jsx_runtime_1.jsx)(
            linkSent_1.LinkSent,
            tslib_1.__assign({}, getCommonPwlessProps(props.pwlessChildProps, props), {
                loginAttemptInfo: props.pwlessState.loginAttemptInfo,
            })
        );
    }
    return (0, jsx_runtime_1.jsxs)(
        "div",
        tslib_1.__assign(
            { "data-supertokens": "container", css: styles.container },
            {
                children: [
                    (0, jsx_runtime_1.jsx)(
                        "div",
                        tslib_1.__assign(
                            { "data-supertokens": "row", css: styles.row },
                            {
                                children:
                                    (props.pwlessChildProps === undefined || props.pwlessState.loaded === true) &&
                                    (0, jsx_runtime_1.jsxs)(React.Fragment, {
                                        children: [
                                            props.activeScreen === signInUp_1.SignInUpScreens.UserInputCodeForm
                                                ? (0, jsx_runtime_1.jsx)(
                                                      userInputCodeFormHeader_1.UserInputCodeFormHeader,
                                                      tslib_1.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props),
                                                          { loginAttemptInfo: props.pwlessState.loginAttemptInfo }
                                                      )
                                                  )
                                                : (0, jsx_runtime_1.jsx)(header_1.Header, {}),
                                            props.commonState.error &&
                                                (0, jsx_runtime_1.jsx)(generalError_1.default, {
                                                    error: props.commonState.error,
                                                }),
                                            props.tpChildProps !== undefined &&
                                                props.activeScreen !== signInUp_1.SignInUpScreens.UserInputCodeForm &&
                                                (0, jsx_runtime_1.jsx)(
                                                    providersForm_1.ProvidersForm,
                                                    tslib_1.__assign({}, props.tpChildProps, {
                                                        featureState: props.tpState,
                                                        dispatch: props.tpDispatch,
                                                    })
                                                ),
                                            props.thirdPartyRecipe !== undefined &&
                                                props.passwordlessRecipe !== undefined &&
                                                props.activeScreen !== signInUp_1.SignInUpScreens.UserInputCodeForm &&
                                                (0, jsx_runtime_1.jsxs)(
                                                    "div",
                                                    tslib_1.__assign(
                                                        {
                                                            "data-supertokens": "thirdPartyPasswordlessDivider",
                                                            css: styles.thirdPartyPasswordlessDivider,
                                                        },
                                                        {
                                                            children: [
                                                                (0, jsx_runtime_1.jsx)("div", {
                                                                    "data-supertokens": "divider",
                                                                    css: styles.divider,
                                                                }),
                                                                (0, jsx_runtime_1.jsx)(
                                                                    "div",
                                                                    tslib_1.__assign(
                                                                        {
                                                                            "data-supertokens":
                                                                                "thirdPartyPasswordlessDividerText",
                                                                            css: styles.thirdPartyPasswordlessDividerText,
                                                                        },
                                                                        {
                                                                            children: t(
                                                                                "THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_DIVIDER_OR"
                                                                            ),
                                                                        }
                                                                    )
                                                                ),
                                                                (0, jsx_runtime_1.jsx)("div", {
                                                                    "data-supertokens": "divider",
                                                                    css: styles.divider,
                                                                }),
                                                            ],
                                                        }
                                                    )
                                                ),
                                            props.activeScreen === signInUp_1.SignInUpScreens.EmailForm
                                                ? (0, jsx_runtime_1.jsx)(
                                                      emailForm_1.EmailForm,
                                                      tslib_1.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen === signInUp_1.SignInUpScreens.PhoneForm
                                                ? (0, jsx_runtime_1.jsx)(
                                                      phoneForm_1.PhoneForm,
                                                      tslib_1.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen === signInUp_1.SignInUpScreens.EmailOrPhoneForm
                                                ? (0, jsx_runtime_1.jsx)(
                                                      emailOrPhoneForm_1.EmailOrPhoneForm,
                                                      tslib_1.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen === signInUp_1.SignInUpScreens.UserInputCodeForm
                                                ? (0, jsx_runtime_1.jsx)(
                                                      userInputCodeForm_1.UserInputCodeForm,
                                                      tslib_1.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props),
                                                          {
                                                              loginAttemptInfo: props.pwlessState.loginAttemptInfo,
                                                              onSuccess: props.pwlessChildProps.onSuccess,
                                                          }
                                                      )
                                                  )
                                                : null,
                                        ],
                                    }),
                            }
                        )
                    ),
                    (0, jsx_runtime_1.jsx)(SuperTokensBranding_1.SuperTokensBranding, {}),
                ],
            }
        )
    );
};
function SignInUpThemeWrapper(props) {
    var hasFont = (0, styles_1.hasFontDefined)(props.config.rootStyle);
    // By defining it in a single object here TSC can deduce the connection between props
    var childProps =
        props.passwordlessRecipe !== undefined && props.pwlessChildProps !== undefined
            ? tslib_1.__assign(tslib_1.__assign({}, props), {
                  activeScreen: (0, signInUp_1.getActiveScreen)({
                      config: props.pwlessChildProps.config,
                      featureState: props.pwlessState,
                  }),
                  pwlessChildProps: props.pwlessChildProps,
                  passwordlessRecipe: props.passwordlessRecipe,
              })
            : tslib_1.__assign(tslib_1.__assign({}, props), {
                  activeScreen: undefined,
                  passwordlessRecipe: undefined,
                  pwlessChildProps: undefined,
              });
    var activeStyle;
    if (childProps.activeScreen === signInUp_1.SignInUpScreens.CloseTab) {
        activeStyle = props.passwordlessRecipe.config.signInUpFeature.closeTabScreenStyle;
    } else if (childProps.activeScreen === signInUp_1.SignInUpScreens.LinkSent) {
        activeStyle = props.passwordlessRecipe.config.signInUpFeature.linkSentScreenStyle;
    } else if (childProps.activeScreen === signInUp_1.SignInUpScreens.UserInputCodeForm) {
        activeStyle = props.passwordlessRecipe.config.signInUpFeature.userInputCodeFormStyle;
    } else {
        // This case also includes undefined which means that passwordless is disabled
        activeStyle = props.config.thirdPartyProviderAndEmailOrPhoneFormStyle;
    }
    // This style provider will override the parent with the screen specific user config
    return (0, jsx_runtime_1.jsx)(
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
                            styleFromInit: activeStyle,
                            rootStyleFromInit: props.config.rootStyle,
                            getDefaultStyles: styles_2.getStyles,
                        },
                        { children: (0, jsx_runtime_1.jsx)(SignInUpTheme, tslib_1.__assign({}, childProps)) }
                    )
                ),
            }
        )
    );
}
exports.default = SignInUpThemeWrapper;
// Simple convenience function
function getCommonPwlessProps(childProps, props) {
    return {
        recipeImplementation: childProps.recipeImplementation,
        config: childProps.config,
        clearError: function () {
            return props.pwlessDispatch({ type: "setError", error: undefined });
        },
        onError: function (error) {
            return props.pwlessDispatch({ type: "setError", error: error });
        },
        error: props.pwlessState.error,
    };
}
