"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveScreen = exports.SignInUpScreens = void 0;
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
var react_1 = tslib_1.__importStar(require("react"));
var SuperTokensBranding_1 = require("../../../../../components/SuperTokensBranding");
var styleContext_1 = tslib_1.__importStar(require("../../../../../styles/styleContext"));
var styles_1 = require("../../../../../styles/styles");
var userContextWrapper_1 = tslib_1.__importDefault(require("../../../../../usercontext/userContextWrapper"));
var generalError_1 = tslib_1.__importDefault(require("../../../../emailpassword/components/library/generalError"));
var styles_2 = require("../styles");
var themeBase_1 = require("../themeBase");
var closeTabScreen_1 = require("./closeTabScreen");
var emailForm_1 = require("./emailForm");
var emailOrPhoneForm_1 = require("./emailOrPhoneForm");
var linkSent_1 = require("./linkSent");
var phoneForm_1 = require("./phoneForm");
var signInUpHeader_1 = require("./signInUpHeader");
var userInputCodeForm_1 = require("./userInputCodeForm");
var userInputCodeFormHeader_1 = require("./userInputCodeFormHeader");
var SignInUpScreens;
(function (SignInUpScreens) {
    SignInUpScreens[(SignInUpScreens["CloseTab"] = 0)] = "CloseTab";
    SignInUpScreens[(SignInUpScreens["LinkSent"] = 1)] = "LinkSent";
    SignInUpScreens[(SignInUpScreens["EmailForm"] = 2)] = "EmailForm";
    SignInUpScreens[(SignInUpScreens["PhoneForm"] = 3)] = "PhoneForm";
    SignInUpScreens[(SignInUpScreens["EmailOrPhoneForm"] = 4)] = "EmailOrPhoneForm";
    SignInUpScreens[(SignInUpScreens["UserInputCodeForm"] = 5)] = "UserInputCodeForm";
})((SignInUpScreens = exports.SignInUpScreens || (exports.SignInUpScreens = {})));
/*
 * Component.
 */
var SignInUpTheme = function (_a) {
    var activeScreen = _a.activeScreen,
        featureState = _a.featureState,
        props = tslib_1.__rest(_a, ["activeScreen", "featureState"]);
    var styles = (0, react_1.useContext)(styleContext_1.default);
    var commonProps = {
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: function () {
            return props.dispatch({ type: "setError", error: undefined });
        },
        onError: function (error) {
            return props.dispatch({ type: "setError", error: error });
        },
        error: featureState.error,
    };
    return activeScreen === SignInUpScreens.CloseTab
        ? (0, jsx_runtime_1.jsx)(closeTabScreen_1.CloseTabScreen, tslib_1.__assign({}, commonProps))
        : activeScreen === SignInUpScreens.LinkSent
        ? (0, jsx_runtime_1.jsx)(
              linkSent_1.LinkSent,
              tslib_1.__assign({}, commonProps, { loginAttemptInfo: featureState.loginAttemptInfo })
          )
        : (0, jsx_runtime_1.jsxs)(
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
                                          featureState.loaded &&
                                          (0, jsx_runtime_1.jsxs)(react_1.default.Fragment, {
                                              children: [
                                                  activeScreen === SignInUpScreens.UserInputCodeForm
                                                      ? (0, jsx_runtime_1.jsx)(
                                                            userInputCodeFormHeader_1.UserInputCodeFormHeader,
                                                            tslib_1.__assign({}, commonProps, {
                                                                loginAttemptInfo: featureState.loginAttemptInfo,
                                                            })
                                                        )
                                                      : (0, jsx_runtime_1.jsx)(signInUpHeader_1.SignInUpHeader, {}),
                                                  featureState.error !== undefined &&
                                                      (0, jsx_runtime_1.jsx)(generalError_1.default, {
                                                          error: featureState.error,
                                                      }),
                                                  activeScreen === SignInUpScreens.EmailForm
                                                      ? (0, jsx_runtime_1.jsx)(
                                                            emailForm_1.EmailForm,
                                                            tslib_1.__assign({}, commonProps)
                                                        )
                                                      : activeScreen === SignInUpScreens.PhoneForm
                                                      ? (0, jsx_runtime_1.jsx)(
                                                            phoneForm_1.PhoneForm,
                                                            tslib_1.__assign({}, commonProps)
                                                        )
                                                      : activeScreen === SignInUpScreens.EmailOrPhoneForm
                                                      ? (0, jsx_runtime_1.jsx)(
                                                            emailOrPhoneForm_1.EmailOrPhoneForm,
                                                            tslib_1.__assign({}, commonProps)
                                                        )
                                                      : activeScreen === SignInUpScreens.UserInputCodeForm
                                                      ? (0, jsx_runtime_1.jsx)(
                                                            userInputCodeForm_1.UserInputCodeForm,
                                                            tslib_1.__assign({}, commonProps, {
                                                                loginAttemptInfo: featureState.loginAttemptInfo,
                                                                onSuccess: props.onSuccess,
                                                            })
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
    var activeScreen = getActiveScreen(props);
    var activeStyle;
    if (activeScreen === SignInUpScreens.CloseTab) {
        activeStyle = props.config.signInUpFeature.closeTabScreenStyle;
    } else if (activeScreen === SignInUpScreens.LinkSent) {
        activeStyle = props.config.signInUpFeature.linkSentScreenStyle;
    } else if (activeScreen === SignInUpScreens.UserInputCodeForm) {
        activeStyle = props.config.signInUpFeature.userInputCodeFormStyle;
    } else if (activeScreen === SignInUpScreens.EmailForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === SignInUpScreens.PhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === SignInUpScreens.EmailOrPhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    }
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
                                        styleFromInit: activeStyle,
                                        rootStyleFromInit: props.config.rootStyle,
                                        getDefaultStyles: styles_2.getStyles,
                                    },
                                    {
                                        children: (0, jsx_runtime_1.jsx)(
                                            SignInUpTheme,
                                            tslib_1.__assign({}, props, { activeScreen: activeScreen })
                                        ),
                                    }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
}
exports.default = SignInUpThemeWrapper;
function getActiveScreen(props) {
    if (props.featureState.successInAnotherTab) {
        return SignInUpScreens.CloseTab;
    } else if (props.featureState.loginAttemptInfo && props.featureState.loginAttemptInfo.flowType === "MAGIC_LINK") {
        return SignInUpScreens.LinkSent;
    } else if (props.featureState.loginAttemptInfo) {
        return SignInUpScreens.UserInputCodeForm;
    } else if (props.config.contactMethod === "EMAIL") {
        return SignInUpScreens.EmailForm;
    } else if (props.config.contactMethod === "PHONE") {
        return SignInUpScreens.PhoneForm;
    } else if (props.config.contactMethod === "EMAIL_OR_PHONE") {
        return SignInUpScreens.EmailOrPhoneForm;
    }
    throw new Error("Couldn't choose active screen; Should never happen");
}
exports.getActiveScreen = getActiveScreen;
