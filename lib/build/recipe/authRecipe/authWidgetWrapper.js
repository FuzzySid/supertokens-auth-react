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
var session_1 = require("../session");
var utils_1 = require("../../utils");
/**
 * AuthWidgetWrapper shows the children component only if no session exists,
 * else it calls onSessionAlreadyExists
 */
var AuthWidgetWrapper = function (props) {
    return (0, jsx_runtime_1.jsx)(
        session_1.SessionAuth,
        tslib_1.__assign(
            { requireAuth: false },
            { children: (0, jsx_runtime_1.jsx)(Redirector, tslib_1.__assign({}, props)) }
        )
    );
};
var Redirector = function (props) {
    var sessionContext = (0, react_1.useContext)(session_1.SessionContext);
    var _a = (0, react_1.useState)(false),
        alwaysShow = _a[0],
        updateAlwaysShow = _a[1];
    (0, react_1.useEffect)(function () {
        // we want to do this just once, so we supply it an empty array.
        // if we supply it with props, sessionContext,
        // then once the user signs in, then this will route the
        // user to the dashboard, as opposed to the sign up / sign in functions.
        if (sessionContext.doesSessionExist) {
            if (props.onSessionAlreadyExists !== undefined) {
                props.onSessionAlreadyExists();
            } else {
                props.authRecipe.config.onHandleEvent({
                    action: "SESSION_ALREADY_EXISTS",
                });
                void props.authRecipe.redirect(
                    {
                        action: "SUCCESS",
                        isNewUser: false,
                        redirectToPath: (0, utils_1.getRedirectToPathFromURL)(),
                    },
                    props.history
                );
            }
        } else {
            // this means even if a session exists, we will still show the children
            // cause the child component will take care of redirecting etc..
            updateAlwaysShow(true);
        }
    }, []);
    if (sessionContext.doesSessionExist && !alwaysShow) {
        return null;
    } else {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: props.children });
    }
};
exports.default = AuthWidgetWrapper;
