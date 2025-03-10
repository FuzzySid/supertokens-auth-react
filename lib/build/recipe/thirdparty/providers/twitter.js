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
var Twitter = /** @class */ (function (_super) {
    tslib_1.__extends(Twitter, _super);
    /*
     * Constructor.
     */
    function Twitter(config) {
        var _this =
            _super.call(this, {
                id: "twitter",
                name: "Twitter",
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
                        width: "20.129",
                        height: "16.356",
                        viewBox: "0 0 20.129 16.356",
                    },
                    {
                        children: (0, jsx_runtime_1.jsx)("g", {
                            children: (0, jsx_runtime_1.jsx)("g", {
                                children: (0, jsx_runtime_1.jsx)("path", {
                                    fill: "#fff",
                                    d: "M45.232 35.964a8.242 8.242 0 0 1-2.372.649 4.141 4.141 0 0 0 1.816-2.284 8.268 8.268 0 0 1-2.623 1 4.133 4.133 0 0 0-7.037 3.771 11.724 11.724 0 0 1-8.516-4.317 4.133 4.133 0 0 0 1.282 5.517 4.1 4.1 0 0 1-1.87-.517v.052a4.132 4.132 0 0 0 3.313 4.049 4.147 4.147 0 0 1-1.865.071 4.134 4.134 0 0 0 3.858 2.868 8.338 8.338 0 0 1-6.114 1.71 11.745 11.745 0 0 0 18.08-9.894q0-.268-.012-.534a8.374 8.374 0 0 0 2.061-2.137z",
                                    transform:
                                        "translate(34.799 -7.41) translate(2.201 4.266) translate(-62.103 -30.883)",
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
    Twitter.init = function (config) {
        if (Twitter.instance !== undefined) {
            console.warn("Twitter Provider was already initialized");
            return Twitter.instance;
        }
        Twitter.instance = new Twitter(config);
        return Twitter.instance;
    };
    /*
     * Tests methods.
     */
    Twitter.reset = function () {
        if (!(0, utils_1.isTest)()) {
            return;
        }
        Twitter.instance = undefined;
        return;
    };
    return Twitter;
})(_1.default);
exports.default = Twitter;
