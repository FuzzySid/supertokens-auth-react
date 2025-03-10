"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
var recipeImplementation_1 = tslib_1.__importDefault(require("./recipeImplementation"));
var supertokens_js_override_1 = tslib_1.__importDefault(require("supertokens-js-override"));
var authRecipe_1 = tslib_1.__importDefault(require("../authRecipe"));
var constants_1 = require("../../constants");
var signInAndUp_1 = tslib_1.__importDefault(require("./components/features/signInAndUp"));
var authWidgetWrapper_1 = tslib_1.__importDefault(require("../authRecipe/authWidgetWrapper"));
var linkClickedScreen_1 = tslib_1.__importDefault(require("./components/features/linkClickedScreen"));
var normalisedURLPath_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/normalisedURLPath"));
var userContextWrapper_1 = tslib_1.__importDefault(require("../../usercontext/userContextWrapper"));
/*
 * Class.
 */
var Passwordless = /** @class */ (function (_super) {
    tslib_1.__extends(Passwordless, _super);
    function Passwordless(config) {
        var _this = _super.call(this, (0, utils_2.normalisePasswordlessConfig)(config)) || this;
        _this.getFeatures = function () {
            var features = {};
            if (_this.config.signInUpFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: (0, utils_1.matchRecipeIdUsingQueryParams)(_this.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("signInUp", props);
                    },
                };
            }
            if (_this.config.linkClickedScreenFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default("/verify")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: (0, utils_1.matchRecipeIdUsingQueryParams)(_this.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("linkClickedScreen", props);
                    },
                };
            }
            return features;
        };
        _this.getDefaultRedirectionURL = function (context) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        _this.getFeatureComponent = function (componentName, props) {
            if (componentName === "signInUp") {
                return (0, jsx_runtime_1.jsx)(
                    userContextWrapper_1.default,
                    tslib_1.__assign(
                        { userContext: props.userContext },
                        {
                            children: (0, jsx_runtime_1.jsx)(
                                authWidgetWrapper_1.default,
                                tslib_1.__assign(
                                    { authRecipe: _this, history: props.history },
                                    {
                                        children: (0, jsx_runtime_1.jsx)(
                                            signInAndUp_1.default,
                                            tslib_1.__assign({ recipe: _this }, props)
                                        ),
                                    }
                                )
                            ),
                        }
                    )
                );
            }
            if (componentName === "linkClickedScreen") {
                return (0, jsx_runtime_1.jsx)(
                    userContextWrapper_1.default,
                    tslib_1.__assign(
                        { userContext: props.userContext },
                        {
                            children: (0, jsx_runtime_1.jsx)(
                                linkClickedScreen_1.default,
                                tslib_1.__assign({ recipe: _this }, props)
                            ),
                        }
                    )
                );
            }
            return (0, jsx_runtime_1.jsx)("div", { children: "Not implemented" });
        };
        var builder = new supertokens_js_override_1.default(
            (0, recipeImplementation_1.default)({
                appInfo: _this.config.appInfo,
                recipeId: _this.config.recipeId,
                onHandleEvent: _this.config.onHandleEvent,
                preAPIHook: _this.config.preAPIHook,
                postAPIHook: _this.config.postAPIHook,
            })
        );
        _this.recipeImpl = builder.override(_this.config.override.functions).build();
        return _this;
    }
    Passwordless.init = function (config) {
        return function (appInfo) {
            Passwordless.instance = new Passwordless(
                tslib_1.__assign(tslib_1.__assign({}, config), { appInfo: appInfo, recipeId: Passwordless.RECIPE_ID })
            );
            return Passwordless.instance;
        };
    };
    Passwordless.getInstanceOrThrow = function () {
        if (Passwordless.instance === undefined) {
            var error =
                "No instance of Passwordless found. Make sure to call the Passwordless.init method." +
                "See https://supertokens.io/docs/passwordless/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + constants_1.SSR_ERROR;
            }
            throw Error(error);
        }
        return Passwordless.instance;
    };
    /*
     * Tests methods.
     */
    Passwordless.reset = function () {
        if (!(0, utils_1.isTest)()) {
            return;
        }
        Passwordless.instance = undefined;
        return;
    };
    Passwordless.RECIPE_ID = "passwordless";
    return Passwordless;
})(authRecipe_1.default);
exports.default = Passwordless;
