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
var _1 = tslib_1.__importDefault(require("."));
var utils_1 = require("../../../utils");
/*
 * Class.
 */
var Facebook = /** @class */ (function (_super) {
    tslib_1.__extends(Facebook, _super);
    /*
     * Constructor.
     */
    function Facebook(config) {
        var _this =
            _super.call(this, {
                id: "facebook",
                name: "Facebook",
                clientId: config === null || config === void 0 ? void 0 : config.clientId,
            }) || this;
        _this.getButton = function () {
            if (_this.buttonComponent !== undefined) {
                return _this.buttonComponent;
            }
            return _this.getDefaultButton();
        };
        _this.getLogo = function () {
            return (0, jsx_runtime_1.jsx)(
                "svg",
                tslib_1.__assign(
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "7.956",
                        height: "17.259",
                        viewBox: "0 0 7.956 17.259",
                    },
                    {
                        children: (0, jsx_runtime_1.jsx)("g", {
                            children: (0, jsx_runtime_1.jsx)("g", {
                                children: (0, jsx_runtime_1.jsx)("path", {
                                    fill: "#fff",
                                    d: "M45.448 30.376h-2.36v8.646h-3.575v-8.646h-1.7v-3.039h1.7v-1.966a3.353 3.353 0 0 1 3.607-3.608l2.649.011v2.949h-1.922a.728.728 0 0 0-.758.828v1.789h2.671z",
                                    transform:
                                        "translate(-6.349 -3.492) translate(6.349 3.492) translate(-37.812 -21.763)",
                                }),
                            }),
                        }),
                    }
                )
            );
        };
        if (config === undefined) {
            return _this;
        }
        _this.buttonComponent = config.buttonComponent;
        return _this;
    }
    /*
     * Static Methods
     */
    Facebook.init = function (config) {
        if (Facebook.instance !== undefined) {
            console.warn("Facebook Provider was already initialized");
            return Facebook.instance;
        }
        Facebook.instance = new Facebook(config);
        return Facebook.instance;
    };
    /*
     * Tests methods.
     */
    Facebook.reset = function () {
        if (!(0, utils_1.isTest)()) {
            return;
        }
        Facebook.instance = undefined;
        return;
    };
    return Facebook;
})(_1.default);
exports.default = Facebook;
