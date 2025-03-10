import * as React from "react";
import "./App.css";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "../../../";
import EmailPassword, {
    GetRedirectionURLContext as EmailPasswordGetRedirectionURLContext,
    OnHandleEventContext as EmailPasswordOnHandleEventContext,
    PreAPIHookContext as EmailPasswordPreAPIHookContext,
} from "../../../recipe/emailpassword";
import Session from "../../../recipe/session";
import ThirdParty, {
    GetRedirectionURLContext as ThirdPartyGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyOnHandleEventContext,
    PreAPIHookContext as ThirdPartyPreAPIHookContext,
} from "../../../recipe/thirdparty";
import ThirdPartyEmailPassword, {
    GetRedirectionURLContext as ThirdPartyEmailPasswordGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyEmailPasswordOnHandleEventContext,
    PreAPIHookContext as ThirdPartyEmailPasswordPreAPIHookContext,
} from "../../../recipe/thirdpartyemailpassword";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import HeliumTheme from "./Themes/Helium";
import HydrogenTheme from "./Themes/Hydrogen";
import DarkTheme from "./Themes/Dark";
import { CSSObject } from "@emotion/react";
import Passwordless from "../../../recipe/passwordless";
import { PasswordlessFlowType } from "supertokens-web-js/recipe/passwordless/types";
import ThirdPartyPasswordless from "../../../recipe/thirdpartypasswordless";

/*
 * This application is used with the purpose of illustrating Supertokens with typescript.
 * It is also used internally for deploy previews, hence a lot of code you will see
 * in this file is not directly linked to initialising SuperTokens in a typescript environement.
 */

export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 8082;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3002;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

const ridParams = getQueryParams("rid");
if (ridParams !== null) {
    window.localStorage.setItem("rid", ridParams);
}

const mode = getQueryParams("mode");

if (mode !== null) {
    window.localStorage.setItem("mode", mode);
}

const themeQueryParams = getQueryParams("theme");
if (themeQueryParams !== null) {
    window.localStorage.setItem("useTheme", themeQueryParams);
}

const theme = getTheme();

const rid = window.localStorage.getItem("rid") || "emailpassword";

const recipeList = getRecipeList();

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: window.location.origin,
    },
    recipeList,
});

function App() {
    return (
        <div className="App">
            <Router>
                <div className="fill">
                    <Routes>
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
                        <Route
                            path="/"
                            element={
                                <Auth>
                                    <Home />
                                </Auth>
                            }
                        />
                        <Route
                            path="/redirect-to-this-custom-path"
                            element={
                                <Auth>
                                    <Home />
                                </Auth>
                            }
                        />
                    </Routes>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </Router>
        </div>
    );
}

export default App;

function getQueryParams(param: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

export type Theme = {
    colors: Record<string, string>;
    style: Record<string, CSSObject>;
};
function getTheme(): {
    colors: Record<string, string>;
    style?: Record<string, CSSObject>;
} {
    let theme = {
        colors: {},
        style: {},
    };

    const themeParams = window.localStorage.getItem("useTheme");

    if (themeParams === "dark") {
        window.document.body.style.backgroundColor = "#1a1a1a";
        return DarkTheme;
    }

    if (themeParams === "helium") {
        return HeliumTheme;
    }

    if (themeParams === "hydrogen") {
        return HydrogenTheme;
    }

    return theme;
}

function getRecipeList() {
    return [
        getEmailPasswordConfigs(),
        getThirdPartyConfigs(),
        getThirdPartyEmailPasswordConfigs(),
        Session.init(),
        Session.init({
            autoAddCredentials: true,
            isInIframe: true,
            sessionExpiredStatusCode: 401,
            sessionScope: "",
            cookieDomain: "",
            onHandleEvent: (context) => {
                if (context.action === "REFRESH_SESSION") {
                } else if (context.action === "SIGN_OUT") {
                } else if (context.action === "UNAUTHORISED") {
                    if (context.sessionExpiredOrRevoked) {
                    }
                } else if (context.action === "ACCESS_TOKEN_PAYLOAD_UPDATED") {
                }
            },
            preAPIHook: async (context) => {
                if (context.action === "REFRESH_SESSION") {
                } else if (context.action === "SIGN_OUT") {
                }
                return context;
            },
            override: {
                functions: (oI) => {
                    return {
                        addAxiosInterceptors: (instance) => {
                            return oI.addAxiosInterceptors(instance);
                        },
                        addFetchInterceptorsAndReturnModifiedFetch: (f) => {
                            return oI.addFetchInterceptorsAndReturnModifiedFetch(f);
                        },
                        doesSessionExist: (input) => {
                            return oI.doesSessionExist(input);
                        },
                        getAccessTokenPayloadSecurely: (input) => {
                            return oI.getAccessTokenPayloadSecurely(input);
                        },
                        getUserId: (config) => {
                            return oI.getUserId(config);
                        },
                        signOut: (config) => {
                            return oI.signOut(config);
                        },
                    };
                },
            },
        }),
    ];
}

function getEmailPasswordConfigs() {
    return EmailPassword.init({
        palette: theme.colors,
        emailVerificationFeature: {
            sendVerifyEmailScreen: {
                style: theme.style,
            },
            verifyEmailLinkClickedScreen: {
                style: theme.style,
            },
            mode: "REQUIRED",
        },
        resetPasswordUsingTokenFeature: {
            enterEmailForm: {
                style: theme.style,
            },
            submitNewPasswordForm: {
                style: theme.style,
            },
        },
        signInAndUpFeature: {
            signInForm: {
                style: theme.style,
            },
            signUpForm: {
                style: theme.style,
                privacyPolicyLink: "https://supertokens.io/legal/privacy-policy",
                termsOfServiceLink: "https://supertokens.io/legal/terms-and-conditions",
                formFields: [
                    {
                        id: "email",
                        label: "Your Email",
                        placeholder: "Your work email",
                    },
                    {
                        id: "name",
                        label: "Full name",
                        placeholder: "First name and last name",
                    },
                    {
                        id: "age",
                        label: "Your age",
                        placeholder: "How old are you?",
                        validate: async (value) => {
                            if (parseInt(value) > 18) {
                                return undefined;
                            }

                            return "You must be over 18 to register";
                        },
                    },
                    {
                        id: "country",
                        label: "Your Country",
                        placeholder: "Where do you live?",
                        optional: true,
                    },
                ],
            },
        },

        onHandleEvent(context: EmailPasswordOnHandleEventContext) {},

        async preAPIHook(context: EmailPasswordPreAPIHookContext) {
            return context;
        },

        async getRedirectionURL(context: EmailPasswordGetRedirectionURLContext) {
            return undefined;
        },
        override: {
            functions: (oI) => {
                return {
                    ...oI,
                    doesEmailExist: (input) => {
                        return oI.doesEmailExist(input);
                    },
                    sendPasswordResetEmail: (input) => {
                        return oI.sendPasswordResetEmail(input);
                    },
                    signIn: (input) => {
                        return oI.signIn(input);
                    },
                    signUp: (input) => {
                        return oI.signUp(input);
                    },
                    submitNewPassword: (input) => {
                        return oI.submitNewPassword(input);
                    },
                };
            },
            components: {
                EmailPasswordSignIn: ({ DefaultComponent, ...props }) => {
                    return (
                        <div>
                            <DefaultComponent {...props} />
                        </div>
                    );
                },
                EmailPasswordSignInHeader: ({ DefaultComponent, ...props }) => {
                    return (
                        <div>
                            <DefaultComponent {...props} />
                        </div>
                    );
                },
                EmailPasswordSubmitNewPassword: ({ DefaultComponent, ...props }) => {
                    return (
                        <div>
                            <DefaultComponent {...props} />
                        </div>
                    );
                },
            },
            emailVerification: {
                functions: (oI) => {
                    return {
                        isEmailVerified: (input) => {
                            return oI.isEmailVerified(input);
                        },
                        sendVerificationEmail: (input) => {
                            return oI.sendVerificationEmail(input);
                        },
                        verifyEmail: (input) => {
                            return oI.verifyEmail(input);
                        },
                        getEmailVerificationTokenFromURL: (input) => {
                            return oI.getEmailVerificationTokenFromURL(input);
                        },
                    };
                },
                components: {
                    EmailVerificationSendVerifyEmail: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <DefaultComponent {...props} />
                            </div>
                        );
                    },
                },
            },
        },
    });
}
function getThirdPartyConfigs() {
    return ThirdParty.init({
        onHandleEvent(context: ThirdPartyOnHandleEventContext) {},

        async preAPIHook(context: ThirdPartyPreAPIHookContext) {
            return context;
        },

        async getRedirectionURL(context: ThirdPartyGetRedirectionURLContext) {
            return undefined;
        },
        palette: theme.colors,
        signInAndUpFeature: {
            style: theme.style,
            privacyPolicyLink: "https://supertokens.io/legal/privacy-policy",
            termsOfServiceLink: "https://supertokens.io/legal/terms-and-conditions",
            providers: [
                ThirdParty.Github.init(),
                ThirdParty.Google.init({
                    clientId: "some client ID",
                }),
                ThirdParty.Facebook.init(),
                ThirdParty.Apple.init(),
                {
                    id: "custom",
                    name: "Custom",
                },
            ],
        },
        oAuthCallbackScreen: {
            style: theme.style,
        },
        override: {
            functions: (oI) => {
                return {
                    ...oI,
                };
            },
            components: {
                ThirdPartySignInAndUpCallbackTheme: ({ DefaultComponent }) => {
                    return (
                        <div>
                            <DefaultComponent />
                        </div>
                    );
                },
            },
            emailVerification: {
                functions: (oI) => {
                    return {
                        ...oI,
                    };
                },
                components: {
                    EmailVerificationVerifyEmailLinkClicked: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <DefaultComponent {...props} />
                            </div>
                        );
                    },
                },
            },
        },
    });
}

function getThirdPartyEmailPasswordConfigs() {
    return ThirdPartyEmailPassword.init({
        onHandleEvent(context: ThirdPartyEmailPasswordOnHandleEventContext) {},

        async preAPIHook(context: ThirdPartyEmailPasswordPreAPIHookContext) {
            return context;
        },

        async getRedirectionURL(context: ThirdPartyEmailPasswordGetRedirectionURLContext) {
            return undefined;
        },
        palette: theme.colors,
        signInAndUpFeature: {
            style: theme.style,
            signUpForm: {
                privacyPolicyLink: "https://supertokens.io/legal/privacy-policy",
                termsOfServiceLink: "https://supertokens.io/legal/terms-and-conditions",
            },
            providers: [
                ThirdPartyEmailPassword.Github.init(),
                ThirdPartyEmailPassword.Google.init(),
                ThirdPartyEmailPassword.Facebook.init(),
                ThirdPartyEmailPassword.Apple.init(),
                {
                    id: "custom",
                    name: "Custom",
                },
            ],
        },
        oAuthCallbackScreen: {
            style: theme.style,
        },
        override: {
            components: {
                ThirdPartySignInAndUpProvidersForm: ({ DefaultComponent, ...props }) => {
                    return (
                        <div>
                            <DefaultComponent {...props} />
                        </div>
                    );
                },
                EmailPasswordResetPasswordEmail: ({ DefaultComponent, ...props }) => {
                    return (
                        <div>
                            <DefaultComponent {...props} />
                        </div>
                    );
                },
            },
            emailVerification: {
                components: {
                    EmailVerificationVerifyEmailLinkClicked: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <DefaultComponent {...props} />
                            </div>
                        );
                    },
                },
            },
        },
    });
}

function Auth(props: any) {
    if (rid === "thirdparty") {
        return <ThirdParty.ThirdPartyAuth>{props.children}</ThirdParty.ThirdPartyAuth>;
    } else if (rid === "thirdpartyemailpassword") {
        return (
            <ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
                {props.children}
            </ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
        );
    }

    return <EmailPassword.EmailPasswordAuth>{props.children}</EmailPassword.EmailPasswordAuth>;
}

Passwordless.init({
    contactMethod: "EMAIL",
    preAPIHook: async (context) => {
        let url = context.url;

        // is the fetch config object that contains the header, body etc..
        let requestInit = context.requestInit;

        let action = context.action;
        if (action === "EMAIL_EXISTS") {
        } else if (action === "PASSWORDLESS_CONSUME_CODE") {
        } else if (action === "PASSWORDLESS_CREATE_CODE") {
        } else if (action === "PASSWORDLESS_RESEND_CODE") {
        } else if (action === "PHONE_NUMBER_EXISTS") {
        }

        // events such as sign out are in the
        // session recipe pre API hook (See the info box below)
        return {
            requestInit,
            url,
        };
    },
    onHandleEvent: (context) => {
        if (context.action === "PASSWORDLESS_CODE_SENT") {
        } else if (context.action === "PASSWORDLESS_RESTART_FLOW") {
        } else if (context.action === "SESSION_ALREADY_EXISTS") {
            // called when a user visits the login / sign up page with a valid session
            // in this case, they are usually redirected to the main app
        } else if (context.action === "SUCCESS") {
            let user = context.user;
            if (context.isNewUser) {
                // sign up success
            } else {
                // sign in success
            }
        }
    },
    getRedirectionURL: async (context) => {
        if (context.action === "SIGN_IN_AND_UP") {
            // called when the user is navigating to sign in / up page
        } else if (context.action === "SUCCESS") {
            // called on a successful sign in / up. Where should the user go next?
            let redirectToPath = context.redirectToPath;
            if (redirectToPath !== undefined) {
                // we are navigating back to where the user was before they authenticated
                return redirectToPath;
            }
            if (context.isNewUser) {
                // user signed up
                return "/onboarding";
            } else {
                // user signed in
                return "/dashboard";
            }
        }
        // return undefined to let the default behaviour play out
        return undefined;
    },
});

function SomeComponent(props: any) {
    return (
        <ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
            <div></div>
            <div></div>
        </ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
    );
}

/**
 * Recipe Index Functions
 */

// Email password
EmailPassword.doesEmailExist({
    email: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
// @ts-expect-error
EmailPassword.doesEmailExist();
// @ts-expect-error
EmailPassword.doesEmailExist(undefined);

EmailPassword.getResetPasswordTokenFromURL({
    userContext: undefined,
});
EmailPassword.getResetPasswordTokenFromURL(undefined);
EmailPassword.getResetPasswordTokenFromURL();

EmailPassword.isEmailVerified({
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
EmailPassword.isEmailVerified(undefined);
EmailPassword.isEmailVerified();

EmailPassword.sendPasswordResetEmail({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
//@ts-expect-error
EmailPassword.sendPasswordResetEmail(undefined);
//@ts-expect-error
EmailPassword.sendPasswordResetEmail();

EmailPassword.sendVerificationEmail({
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
EmailPassword.sendVerificationEmail(undefined);
EmailPassword.sendVerificationEmail();

EmailPassword.signIn({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
EmailPassword.signIn(undefined);
// @ts-expect-error
EmailPassword.signIn();

EmailPassword.signOut({
    userContext: undefined,
});
EmailPassword.signOut(undefined);
EmailPassword.signOut();

EmailPassword.signUp({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
EmailPassword.signUp(undefined);
// @ts-expect-error
EmailPassword.signUp();

EmailPassword.submitNewPassword({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
EmailPassword.submitNewPassword(undefined);
// @ts-expect-error
EmailPassword.submitNewPassword();

EmailPassword.verifyEmail({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
EmailPassword.verifyEmail(undefined);
EmailPassword.verifyEmail();

// Passwordless
Passwordless.clearLoginAttemptInfo({
    userContext: undefined,
});
Passwordless.clearLoginAttemptInfo(undefined);
Passwordless.clearLoginAttemptInfo();

Passwordless.consumeCode({
    userInputCode: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
Passwordless.consumeCode({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
// @ts-expect-error
Passwordless.consumeCode(undefined);
// @ts-expect-error
Passwordless.consumeCode();

Passwordless.createCode({
    email: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
Passwordless.createCode({
    phoneNumber: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
Passwordless.createCode({
    email: "",
    phoneNumber: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
// @ts-expect-error
Passwordless.createCode(undefined);
// @ts-expect-error
Passwordless.createCode();

Passwordless.doesEmailExist({
    email: "",
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
// @ts-expect-error
Passwordless.doesEmailExist(undefined);
// @ts-expect-error
Passwordless.doesEmailExist();

Passwordless.doesPhoneNumberExist({
    phoneNumber: "",
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
// @ts-expect-error
Passwordless.doesPhoneNumberExist(undefined);
// @ts-expect-error
Passwordless.doesPhoneNumberExist();

Passwordless.getLinkCodeFromURL({
    userContext: undefined,
});
Passwordless.getLinkCodeFromURL(undefined);
Passwordless.getLinkCodeFromURL();

async function getLoginAttemptInfo() {
    // @ts-expect-error
    const incorrectCustomType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
              customData: string;
          }
        | undefined = await Passwordless.getLoginAttemptInfo<{
        customData: number;
    }>({
        userContext: undefined,
    });

    const correctCustomType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
              customData: string;
          }
        | undefined = await Passwordless.getLoginAttemptInfo<{
        customData: string;
    }>(undefined);

    const defaultType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          }
        | undefined = await Passwordless.getLoginAttemptInfo();
}

Passwordless.getPreAuthSessionIdFromURL({
    userContext: undefined,
});
Passwordless.getPreAuthSessionIdFromURL(undefined);
Passwordless.getPreAuthSessionIdFromURL();

Passwordless.resendCode({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
Passwordless.resendCode(undefined);
Passwordless.resendCode();

Passwordless.setLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE",
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "MAGIC_LINK",
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo<{
    customData: string;
}>({
    // @ts-expect-error
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo<{
    customData: string;
}>({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        // @ts-expect-error
        customData: 123,
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo<{
    customData: string;
}>({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        customData: "",
    },
    userContext: undefined,
});
// @ts-expect-error
Passwordless.setLoginAttemptInfo(undefined);
// @ts-expect-error
Passwordless.setLoginAttemptInfo();

Passwordless.signOut({
    userContext: undefined,
});
Passwordless.signOut(undefined);
Passwordless.signOut();

// Third party
ThirdParty.generateStateToSendToOAuthProvider({
    userContext: undefined,
});
ThirdParty.generateStateToSendToOAuthProvider(undefined);
ThirdParty.generateStateToSendToOAuthProvider();

ThirdParty.getAuthCodeFromURL({
    userContext: undefined,
});
ThirdParty.getAuthCodeFromURL(undefined);
ThirdParty.getAuthCodeFromURL();

ThirdParty.getAuthErrorFromURL({
    userContext: undefined,
});
ThirdParty.getAuthErrorFromURL(undefined);
ThirdParty.getAuthErrorFromURL();

ThirdParty.getAuthStateFromURL({
    userContext: undefined,
});
ThirdParty.getAuthStateFromURL(undefined);
ThirdParty.getAuthStateFromURL();

ThirdParty.getAuthorisationURLFromBackend({
    providerId: "",
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
// @ts-expect-error
ThirdParty.getAuthorisationURLFromBackend(undefined);
// @ts-expect-error
ThirdParty.getAuthorisationURLFromBackend();

ThirdParty.getAuthorisationURLWithQueryParamsAndSetState({
    authorisationURL: "",
    providerId: "",
    providerClientId: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
// @ts-expect-error
ThirdParty.getAuthorisationURLWithQueryParamsAndSetState(undefined);
// @ts-expect-error
ThirdParty.getAuthorisationURLWithQueryParamsAndSetState();

function getStateAndOtherInfoFromStorage() {
    // @ts-expect-error
    const invalidCustomType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
              customData: string;
          }
        | undefined = ThirdParty.getStateAndOtherInfoFromStorage<{
        customData: number;
    }>({
        userContext: undefined,
    });

    const validCustomType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
              customData: string;
          }
        | undefined = ThirdParty.getStateAndOtherInfoFromStorage<{
        customData: string;
    }>(undefined);

    const defaultType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
          }
        | undefined = ThirdParty.getStateAndOtherInfoFromStorage();
}

ThirdParty.isEmailVerified({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdParty.isEmailVerified(undefined);
ThirdParty.isEmailVerified();

ThirdParty.sendVerificationEmail({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdParty.sendVerificationEmail(undefined);
ThirdParty.sendVerificationEmail();

ThirdParty.setStateAndOtherInfoToStorage({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
    },
});
ThirdParty.setStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
        // @ts-expect-error
        customData: 123,
    },
});
ThirdParty.setStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    // @ts-expect-error
    state: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
    },
});
ThirdParty.setStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
        customData: "",
    },
});

ThirdParty.signInAndUp({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdParty.signInAndUp(undefined);
ThirdParty.signInAndUp();

ThirdParty.signOut({
    userContext: undefined,
});
ThirdParty.signOut(undefined);
ThirdParty.signOut();

ThirdParty.verifyAndGetStateOrThrowError({
    userContext: undefined,
    stateFromAuthProvider: "",
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
    },
});
ThirdParty.verifyAndGetStateOrThrowError<{
    customData: string;
}>({
    userContext: undefined,
    stateFromAuthProvider: "",
    // @ts-expect-error
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
    },
});
ThirdParty.verifyAndGetStateOrThrowError<{
    customData: string;
}>({
    userContext: undefined,
    stateFromAuthProvider: "",
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
        // @ts-expect-error
        customData: 123,
    },
});
ThirdParty.verifyAndGetStateOrThrowError<{
    customData: string;
}>({
    userContext: undefined,
    stateFromAuthProvider: "",
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
        customData: "",
    },
});

ThirdParty.verifyEmail({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdParty.verifyEmail(undefined);
ThirdParty.verifyEmail();

// TPEP
ThirdPartyEmailPassword.doesEmailExist({
    email: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
// @ts-expect-error
ThirdPartyEmailPassword.doesEmailExist(undefined);
// @ts-expect-error
ThirdPartyEmailPassword.doesEmailExist();

ThirdPartyEmailPassword.emailPasswordSignIn({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
ThirdPartyEmailPassword.emailPasswordSignIn(undefined);
// @ts-expect-error
ThirdPartyEmailPassword.emailPasswordSignIn();

ThirdPartyEmailPassword.emailPasswordSignUp({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
ThirdPartyEmailPassword.emailPasswordSignUp(undefined);
// @ts-expect-error
ThirdPartyEmailPassword.emailPasswordSignUp();

ThirdPartyEmailPassword.generateStateToSendToOAuthProvider({
    userContext: undefined,
});
ThirdPartyEmailPassword.generateStateToSendToOAuthProvider(undefined);
ThirdPartyEmailPassword.generateStateToSendToOAuthProvider();

ThirdPartyEmailPassword.getAuthCodeFromURL({
    userContext: undefined,
});
ThirdPartyEmailPassword.getAuthCodeFromURL(undefined);
ThirdPartyEmailPassword.getAuthCodeFromURL();

ThirdPartyEmailPassword.getAuthErrorFromURL({
    userContext: undefined,
});
ThirdPartyEmailPassword.getAuthErrorFromURL(undefined);
ThirdPartyEmailPassword.getAuthErrorFromURL();

ThirdPartyEmailPassword.getAuthStateFromURL({
    userContext: undefined,
});
ThirdPartyEmailPassword.getAuthStateFromURL(undefined);
ThirdPartyEmailPassword.getAuthStateFromURL();

ThirdPartyEmailPassword.getAuthorisationURLFromBackend({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    providerId: "",
});
// @ts-expect-error
ThirdPartyEmailPassword.getAuthorisationURLFromBackend(undefined);
// @ts-expect-error
ThirdPartyEmailPassword.getAuthorisationURLFromBackend();

ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState({
    authorisationURL: "",
    providerId: "",
    options: {
        preAPIHook: undefined,
    },
    providerClientId: "",
    userContext: undefined,
});
// @ts-expect-error
ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState(undefined);
// @ts-expect-error
ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState();

ThirdPartyEmailPassword.getResetPasswordTokenFromURL({
    userContext: undefined,
});
ThirdPartyEmailPassword.getResetPasswordTokenFromURL(undefined);
ThirdPartyEmailPassword.getResetPasswordTokenFromURL();

function tpepgetStateAndOtherInfoFromStorage() {
    // @ts-expect-error
    const invalidCustomType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
              customData: string;
          }
        | undefined = ThirdPartyEmailPassword.getStateAndOtherInfoFromStorage<{
        customData: number;
    }>({
        userContext: undefined,
    });

    const validCustomType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
              customData: string;
          }
        | undefined = ThirdPartyEmailPassword.getStateAndOtherInfoFromStorage<{
        customData: string;
    }>({
        userContext: undefined,
    });

    const defaultType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
          }
        | undefined = ThirdPartyEmailPassword.getStateAndOtherInfoFromStorage({
        userContext: undefined,
    });
}

ThirdPartyEmailPassword.isEmailVerified({
    userContext: undefined,
    options: undefined,
});
ThirdPartyEmailPassword.isEmailVerified(undefined);
ThirdPartyEmailPassword.isEmailVerified();

ThirdPartyEmailPassword.sendPasswordResetEmail({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
ThirdPartyEmailPassword.sendPasswordResetEmail(undefined);
// @ts-expect-error
ThirdPartyEmailPassword.sendPasswordResetEmail();

ThirdPartyEmailPassword.sendVerificationEmail({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdPartyEmailPassword.sendVerificationEmail(undefined);
ThirdPartyEmailPassword.sendVerificationEmail();

ThirdPartyEmailPassword.setStateAndOtherInfoToStorage({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
    },
});
ThirdPartyEmailPassword.setStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    // @ts-expect-error
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
    },
});
ThirdPartyEmailPassword.setStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        // @ts-expect-error
        customData: 123,
    },
});
ThirdPartyEmailPassword.setStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        customData: "",
    },
});

ThirdPartyEmailPassword.signOut({
    userContext: undefined,
});
ThirdPartyEmailPassword.signOut(undefined);
ThirdPartyEmailPassword.signOut();

ThirdPartyEmailPassword.submitNewPassword({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
ThirdPartyEmailPassword.submitNewPassword(undefined);
// @ts-expect-error
ThirdPartyEmailPassword.submitNewPassword();

ThirdPartyEmailPassword.thirdPartySignInAndUp({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdPartyEmailPassword.thirdPartySignInAndUp(undefined);
ThirdPartyEmailPassword.thirdPartySignInAndUp();

ThirdPartyEmailPassword.verifyAndGetStateOrThrowError({
    stateFromAuthProvider: "",
    userContext: undefined,
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
    },
});

ThirdPartyEmailPassword.verifyAndGetStateOrThrowError<{
    customData: string;
}>({
    stateFromAuthProvider: "",
    userContext: undefined,
    // @ts-expect-error
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
    },
});

ThirdPartyEmailPassword.verifyAndGetStateOrThrowError<{
    customData: string;
}>({
    stateFromAuthProvider: "",
    userContext: undefined,
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        // @ts-expect-error
        customData: 123,
    },
});

ThirdPartyEmailPassword.verifyAndGetStateOrThrowError<{
    customData: string;
}>({
    stateFromAuthProvider: "",
    userContext: undefined,
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        customData: "",
    },
});

ThirdPartyEmailPassword.verifyEmail({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdPartyEmailPassword.verifyEmail(undefined);
ThirdPartyEmailPassword.verifyEmail();

// TPP
ThirdPartyPasswordless.clearPasswordlessLoginAttemptInfo({
    userContext: undefined,
});
ThirdPartyPasswordless.clearPasswordlessLoginAttemptInfo(undefined);
ThirdPartyPasswordless.clearPasswordlessLoginAttemptInfo();

ThirdPartyPasswordless.consumePasswordlessCode({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    userInputCode: "",
});
ThirdPartyPasswordless.consumePasswordlessCode({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
// @ts-expect-error
ThirdPartyPasswordless.consumePasswordlessCode(undefined);
// @ts-expect-error
ThirdPartyPasswordless.consumePasswordlessCode();

ThirdPartyPasswordless.createPasswordlessCode({
    email: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
ThirdPartyPasswordless.createPasswordlessCode({
    phoneNumber: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
ThirdPartyPasswordless.createPasswordlessCode({
    email: "",
    phoneNumber: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});

ThirdPartyPasswordless.doesPasswordlessUserEmailExist({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    email: "",
});

ThirdPartyPasswordless.doesPasswordlessUserPhoneNumberExist({
    userContext: undefined,
    phoneNumber: "",
    options: {
        preAPIHook: undefined,
    },
});

ThirdPartyPasswordless.generateThirdPartyStateToSendToOAuthProvider({
    userContext: undefined,
});
ThirdPartyPasswordless.generateThirdPartyStateToSendToOAuthProvider(undefined);
ThirdPartyPasswordless.generateThirdPartyStateToSendToOAuthProvider();

ThirdPartyPasswordless.getAuthorisationURLFromBackend({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    providerId: "",
});

ThirdPartyPasswordless.getPasswordlessLinkCodeFromURL({
    userContext: undefined,
});
ThirdPartyPasswordless.getPasswordlessLinkCodeFromURL(undefined);
ThirdPartyPasswordless.getPasswordlessLinkCodeFromURL();

async function getPasswordlessLoginAttemptInfo() {
    // @ts-expect-error
    const invalidCustomType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
              customData: string;
          }
        | undefined = await ThirdPartyPasswordless.getPasswordlessLoginAttemptInfo<{
        customData: number;
    }>({
        userContext: undefined,
    });

    const validCustomType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
              customData: string;
          }
        | undefined = await ThirdPartyPasswordless.getPasswordlessLoginAttemptInfo<{
        customData: string;
    }>({
        userContext: undefined,
    });

    const defaultType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          }
        | undefined = await ThirdPartyPasswordless.getPasswordlessLoginAttemptInfo({
        userContext: undefined,
    });
}

ThirdPartyPasswordless.getPasswordlessPreAuthSessionIdFromURL({
    userContext: undefined,
});
ThirdPartyPasswordless.getPasswordlessPreAuthSessionIdFromURL(undefined);
ThirdPartyPasswordless.getPasswordlessPreAuthSessionIdFromURL();

ThirdPartyPasswordless.getThirdPartyAuthCodeFromURL({
    userContext: undefined,
});
ThirdPartyPasswordless.getThirdPartyAuthCodeFromURL(undefined);
ThirdPartyPasswordless.getThirdPartyAuthCodeFromURL();

ThirdPartyPasswordless.getThirdPartyAuthErrorFromURL({
    userContext: undefined,
});
ThirdPartyPasswordless.getThirdPartyAuthErrorFromURL(undefined);
ThirdPartyPasswordless.getThirdPartyAuthErrorFromURL();

ThirdPartyPasswordless.getThirdPartyAuthStateFromURL({
    userContext: undefined,
});
ThirdPartyPasswordless.getThirdPartyAuthStateFromURL(undefined);
ThirdPartyPasswordless.getThirdPartyAuthStateFromURL();

ThirdPartyPasswordless.getThirdPartyAuthorisationURLWithQueryParamsAndSetState({
    authorisationURL: "",
    providerId: "",
    options: {
        preAPIHook: undefined,
    },
    providerClientId: "",
    userContext: undefined,
});
ThirdPartyPasswordless.getThirdPartyAuthorisationURLWithQueryParamsAndSetState({
    authorisationURL: "",
    providerId: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});

function tppgetThirdPartyStateAndOtherInfoFromStorage() {
    // @ts-expect-error
    const invalidCustomType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
              customData: string;
          }
        | undefined = ThirdPartyPasswordless.getThirdPartyStateAndOtherInfoFromStorage<{
        customData: number;
    }>({
        userContext: undefined,
    });

    const validCustomType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
              customData: string;
          }
        | undefined = ThirdPartyPasswordless.getThirdPartyStateAndOtherInfoFromStorage<{
        customData: string;
    }>({
        userContext: undefined,
    });

    const defaultType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
          }
        | undefined = ThirdPartyPasswordless.getThirdPartyStateAndOtherInfoFromStorage({
        userContext: undefined,
    });
}

ThirdPartyPasswordless.isEmailVerified({
    userContext: undefined,
    options: undefined,
});
ThirdPartyPasswordless.isEmailVerified(undefined);
ThirdPartyPasswordless.isEmailVerified();

ThirdPartyPasswordless.resendPasswordlessCode({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdPartyPasswordless.resendPasswordlessCode(undefined);
ThirdPartyPasswordless.resendPasswordlessCode();

ThirdPartyPasswordless.sendVerificationEmail({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdPartyPasswordless.sendVerificationEmail(undefined);
ThirdPartyPasswordless.sendVerificationEmail();

ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE",
    },
    userContext: undefined,
});
ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "MAGIC_LINK",
    },
    userContext: undefined,
});
ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
    },
    userContext: undefined,
});
ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo<{
    customData: string;
}>({
    // @ts-expect-error
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
    },
    userContext: undefined,
});
ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo<{
    customData: string;
}>({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        // @ts-expect-error
        customData: 123,
    },
    userContext: undefined,
});
ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo<{
    customData: string;
}>({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        customData: "",
    },
    userContext: undefined,
});
// @ts-expect-error
ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo(undefined);
// @ts-expect-error
ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo();

ThirdPartyPasswordless.setThirdPartyStateAndOtherInfoToStorage({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
    },
});
ThirdPartyPasswordless.setThirdPartyStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    // @ts-expect-error
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
    },
});
ThirdPartyPasswordless.setThirdPartyStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        // @ts-expect-error
        customData: 123,
    },
});
ThirdPartyPasswordless.setThirdPartyStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        customData: "",
    },
});

ThirdPartyPasswordless.signOut({
    userContext: undefined,
});
ThirdPartyPasswordless.signOut(undefined);
ThirdPartyPasswordless.signOut();

ThirdPartyPasswordless.thirdPartySignInAndUp({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdPartyPasswordless.thirdPartySignInAndUp(undefined);
ThirdPartyPasswordless.thirdPartySignInAndUp();

ThirdPartyPasswordless.verifyAndGetThirdPartyStateOrThrowError({
    stateFromAuthProvider: "",
    userContext: undefined,
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
    },
});

ThirdPartyPasswordless.verifyAndGetThirdPartyStateOrThrowError<{
    customData: string;
}>({
    stateFromAuthProvider: "",
    userContext: undefined,
    // @ts-expect-error
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
    },
});

ThirdPartyPasswordless.verifyAndGetThirdPartyStateOrThrowError<{
    customData: string;
}>({
    stateFromAuthProvider: "",
    userContext: undefined,
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        // @ts-expect-error
        customData: 123,
    },
});

ThirdPartyPasswordless.verifyAndGetThirdPartyStateOrThrowError<{
    customData: string;
}>({
    stateFromAuthProvider: "",
    userContext: undefined,
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        customData: "",
    },
});

ThirdPartyPasswordless.verifyEmail({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdPartyPasswordless.verifyEmail(undefined);
ThirdPartyPasswordless.verifyEmail();
