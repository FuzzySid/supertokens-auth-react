"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInAndUpFeature = exports.useChildProps = exports.useFeatureReducer = void 0;
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
var react_1 = require("react");
var signInAndUp_1 = tslib_1.__importDefault(require("../../themes/signInAndUp"));
var featureWrapper_1 = tslib_1.__importDefault(require("../../../../../components/featureWrapper"));
var utils_1 = require("../../../../../utils");
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var translations_1 = require("../../themes/translations");
var react_2 = require("react");
var useFeatureReducer = function () {
    return React.useReducer(
        function (oldState, action) {
            switch (action.type) {
                case "setError":
                    return tslib_1.__assign(tslib_1.__assign({}, oldState), { error: action.error });
                default:
                    return oldState;
            }
        },
        {},
        function () {
            var error = undefined;
            var errorQueryParam = (0, utils_1.getQueryParams)("error");
            if (errorQueryParam !== null) {
                if (errorQueryParam === "signin") {
                    error = "SOMETHING_WENT_WRONG_ERROR";
                } else if (errorQueryParam === "no_email_present") {
                    error = "THIRD_PARTY_ERROR_NO_EMAIL";
                } else {
                    var customError = (0, utils_1.getQueryParams)("message");
                    if (customError === null) {
                        error = "SOMETHING_WENT_WRONG_ERROR";
                    } else {
                        error = customError;
                    }
                }
            }
            return {
                error: error,
            };
        }
    );
};
exports.useFeatureReducer = useFeatureReducer;
function useChildProps(recipe) {
    var recipeImplementation = (0, react_2.useMemo)(
        function () {
            return recipe && getModifiedRecipeImplementation(recipe.recipeImpl);
        },
        [recipe]
    );
    return (0, react_2.useMemo)(
        function () {
            if (!recipe || !recipeImplementation) {
                return undefined;
            }
            var providers = recipe.config.signInAndUpFeature.providers.map(function (provider) {
                return {
                    id: provider.id,
                    buttonComponent: provider.getButton(),
                };
            });
            return {
                providers: providers,
                recipeImplementation: recipeImplementation,
                config: recipe.config,
                recipe: recipe,
            };
        },
        [recipe]
    );
}
exports.useChildProps = useChildProps;
var SignInAndUpFeature = function (props) {
    var _a = (0, exports.useFeatureReducer)(),
        state = _a[0],
        dispatch = _a[1];
    var childProps = useChildProps(props.recipe);
    var componentOverrides = props.recipe.config.override.components;
    return (0, jsx_runtime_1.jsx)(
        componentOverrideContext_1.ComponentOverrideContext.Provider,
        tslib_1.__assign(
            { value: componentOverrides },
            {
                children: (0, jsx_runtime_1.jsx)(
                    featureWrapper_1.default,
                    tslib_1.__assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: translations_1.defaultTranslationsThirdParty,
                        },
                        {
                            children: (0, jsx_runtime_1.jsxs)(react_1.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        (0, jsx_runtime_1.jsx)(
                                            signInAndUp_1.default,
                                            tslib_1.__assign({}, childProps, {
                                                featureState: state,
                                                dispatch: dispatch,
                                            })
                                        ),
                                    props.children &&
                                        React.Children.map(props.children, function (child) {
                                            if (React.isValidElement(child)) {
                                                return React.cloneElement(
                                                    child,
                                                    tslib_1.__assign(tslib_1.__assign({}, childProps), {
                                                        featureState: state,
                                                        dispatch: dispatch,
                                                    })
                                                );
                                            }
                                            return child;
                                        }),
                                ],
                            }),
                        }
                    )
                ),
            }
        )
    );
};
exports.SignInAndUpFeature = SignInAndUpFeature;
exports.default = exports.SignInAndUpFeature;
var getModifiedRecipeImplementation = function (origImpl) {
    return tslib_1.__assign({}, origImpl);
};
