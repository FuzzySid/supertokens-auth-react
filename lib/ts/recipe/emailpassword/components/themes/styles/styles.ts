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

import chroma from "chroma-js";
import { getDefaultStyles, getMergedStyles, slideTop } from "../../../../../styles/styles";
import { NormalisedDefaultStyles, NormalisedPalette } from "../../../../../types";

export function getStyles(palette: NormalisedPalette): NormalisedDefaultStyles {
    const baseStyles = getDefaultStyles(palette);
    const recipeStyles = {
        inputContainer: {
            marginTop: "6px",
        },

        inputWrapper: {
            boxSizing: "border-box",
            width: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: palette.colors.inputBackground,
            height: "34px",
            borderRadius: "6px",
            border: `1px solid ${chroma(palette.colors.inputBackground).darken(0.5)}`,
            "&:focus-within": {
                backgroundColor: `${chroma(palette.colors.inputBackground).alpha(0.25)}`,
                border: `1px solid ${palette.colors.primary}`,
                boxShadow: `0 0 0 0.2rem ${chroma(palette.colors.primary).alpha(0.25)}`,
                outline: "none",
            },
        },

        inputError: {
            border: `1px solid ${palette.colors.error}`,
            boxShadow: `0 0 0 0.2rem ${chroma(palette.colors.error).alpha(0.25)}`,
            outline: "none",
            "&:focus-within": {
                border: `1px solid ${palette.colors.error}`,
                boxShadow: `0 0 0 0.2rem ${chroma(palette.colors.error).alpha(0.25)}`,
                outline: "none",
            },
        },

        input: {
            boxSizing: "border-box",
            paddingLeft: "15px",
            filter: "none",
            color: palette.colors.textInput,
            backgroundColor: "transparent",
            borderRadius: "6px",
            fontSize: palette.fonts.size[1],
            border: "none",
            paddingRight: "25px",
            letterSpacing: "1.2px",
            flex: "9 1 75%",
            width: "75%",
            height: "32px",
            "&:focus": {
                border: "none",
                outline: "none",
            },
        },

        inputAdornment: {
            justifyContent: "center",
            marginRight: "5px",
        },

        showPassword: {
            cursor: "pointer",
        },

        forgotPasswordLink: {
            marginTop: "10px",
        },

        enterEmailSuccessMessage: {
            marginTop: "15px",
            marginBottom: "15px",
        },

        submitNewPasswordSuccessMessage: {
            marginTop: "15px",
            marginBottom: "15px",
        },

        inputErrorMessage: {
            paddingTop: "5px",
            paddingBottom: "5px",
            color: palette.colors.error,
            lineHeight: "24px",
            fontWeight: 400,
            fontSize: palette.fonts.size[1],
            textAlign: "left",
            animation: `${slideTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
            maxWidth: "330px",
            "@media (max-width: 440px)": {
                maxWidth: "250px",
            },
        },

        inputErrorSymbol: {
            marginRight: "5px",
            top: "1px",
            position: "relative",
            left: "2px",
        },

        label: {
            textAlign: "left",
            fontWeight: 600,
            fontSize: palette.fonts.size[1],
            lineHeight: "24px",
            color: palette.colors.textLabel,
        },

        formRow: {
            display: "flex",
            flexDirection: "column",
            paddingTop: "0px",
            paddingBottom: "34px",
        },

        sendVerifyEmailIcon: {
            marginTop: "11px",
        },

        headerTinyTitle: {
            marginTop: "13px",
            fontSize: palette.fonts.size[3],
            letterSpacing: "1.1px",
            fontWeight: 500,
            lineHeight: "28px",
        },

        sendVerifyEmailText: {
            lineHeight: "21px",
            fontSize: palette.fonts.size[1],
            textAlign: "center",
            fontWeight: 300,
            letterSpacing: "0.8px",
        },

        secondaryLinkWithArrow: {
            marginTop: "10px",
            marginBottom: "30px",
            cursor: "pointer",
            "&:hover": {
                position: "relative",
                left: "2px",
                wordSpacing: "4px",
            },
        },

        sendVerifyEmailResend: {
            marginTop: "13px",
            fontWeight: 300,
            "&:hover": {
                textDecoration: "underline",
            },
        },

        noFormRow: {
            paddingBottom: "25px",
        },

        emailVerificationButtonWrapper: {
            paddingTop: "25px",
            maxWidth: "96px",
            margin: "0 auto",
        },
    } as NormalisedDefaultStyles;
    return getMergedStyles(baseStyles, recipeStyles);
}
