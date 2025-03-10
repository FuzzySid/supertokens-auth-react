"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInForm = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var formBase_1 = tslib_1.__importDefault(require("../../library/formBase"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var utils_1 = require("../../../../../utils");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var usercontext_1 = require("../../../../../usercontext");
exports.SignInForm = (0, withOverride_1.withOverride)(
    "EmailPasswordSignInForm",
    function EmailPasswordSignInForm(props) {
        var _this = this;
        var userContext = (0, usercontext_1.useUserContext)();
        return (0, jsx_runtime_1.jsx)(formBase_1.default, {
            formFields: props.formFields,
            clearError: props.clearError,
            onError: props.onError,
            buttonLabel: "EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN",
            onSuccess: props.onSuccess,
            callAPI: function (formFields) {
                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var validationErrors, response;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    (0, utils_1.validateForm)(
                                        formFields,
                                        props.config.signInAndUpFeature.signInForm.formFields
                                    ),
                                ];
                            case 1:
                                validationErrors = _a.sent();
                                if (validationErrors.length > 0) {
                                    return [
                                        2 /*return*/,
                                        {
                                            status: "FIELD_ERROR",
                                            formFields: validationErrors,
                                        },
                                    ];
                                }
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.signIn({
                                        formFields: formFields,
                                        userContext: userContext,
                                    }),
                                ];
                            case 2:
                                response = _a.sent();
                                if (response.status === "WRONG_CREDENTIALS_ERROR") {
                                    throw new error_1.default("EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR");
                                } else {
                                    return [2 /*return*/, response];
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            },
            validateOnBlur: false,
            showLabels: true,
            footer: props.footer,
        });
    }
);
