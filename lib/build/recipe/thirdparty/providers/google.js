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
var Google = /** @class */ (function (_super) {
    tslib_1.__extends(Google, _super);
    /*
     * Constructor.
     */
    function Google(config) {
        var _this =
            _super.call(this, {
                id: "google",
                name: "Google",
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
                    { xmlns: "http://www.w3.org/2000/svg", width: "18.001", height: "18", viewBox: "0 0 18.001 18" },
                    {
                        children: (0, jsx_runtime_1.jsxs)(
                            "g",
                            tslib_1.__assign(
                                { id: "Group_9292", transform: "translate(-534 -389)" },
                                {
                                    children: [
                                        (0, jsx_runtime_1.jsx)("path", {
                                            id: "Path_85803",
                                            d: "M3.989 144.285l-.627 2.339-2.29.048a9.016 9.016 0 0 1-.066-8.4l2.039.374.893 2.027a5.371 5.371 0 0 0 .05 3.616z",
                                            style: { fill: "#fff" },
                                            transform: "translate(534 255.593)",
                                        }),
                                        (0, jsx_runtime_1.jsx)("path", {
                                            id: "Path_85804",
                                            d: "M270.273 208.176a9 9 0 0 1-3.208 8.7l-2.568-.131-.363-2.269a5.364 5.364 0 0 0 2.308-2.739h-4.813v-3.56h8.645z",
                                            style: { fill: "#fff" },
                                            transform: "translate(281.57 188.143)",
                                        }),
                                        (0, jsx_runtime_1.jsx)("path", {
                                            id: "Path_85805",
                                            d: "M44.07 314.549a9 9 0 0 1-13.561-2.749l2.917-2.387a5.353 5.353 0 0 0 7.713 2.741z",
                                            style: { fill: "#fff" },
                                            transform: "translate(504.564 90.469)",
                                        }),
                                        (0, jsx_runtime_1.jsx)("path", {
                                            id: "Path_85806",
                                            d: "M42.362 2.072l-2.915 2.387a5.352 5.352 0 0 0-7.89 2.8l-2.932-2.4a9 9 0 0 1 13.737-2.787z",
                                            style: { fill: "#fff" },
                                            transform: "translate(506.383 389)",
                                        }),
                                    ],
                                }
                            )
                        ),
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
    Google.init = function (config) {
        if (Google.instance !== undefined) {
            console.warn("Google Provider was already initialized");
            return Google.instance;
        }
        Google.instance = new Google(config);
        return Google.instance;
    };
    /*
     * Tests methods.
     */
    Google.reset = function () {
        if (!(0, utils_1.isTest)()) {
            return;
        }
        Google.instance = undefined;
        return;
    };
    return Google;
})(_1.default);
exports.default = Google;
