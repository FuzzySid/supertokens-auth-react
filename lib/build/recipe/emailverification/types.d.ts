import { FeatureBaseConfig, ThemeBaseProps } from "../../types";
import { Config as RecipeModuleConfig, NormalisedConfig as NormalisedRecipeModuleConfig } from "../recipeModule/types";
import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import { SendVerifyEmail } from "./components/themes/emailVerification/sendVerifyEmail";
import { VerifyEmailLinkClicked } from "./components/themes/emailVerification/verifyEmailLinkClicked";
import OverrideableBuilder from "supertokens-js-override";
import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
export declare type UserInputForAuthRecipeModule = {
    mode?: "OFF" | "REQUIRED";
    disableDefaultUI?: boolean;
    sendVerifyEmailScreen?: FeatureBaseConfig;
    verifyEmailLinkClickedScreen?: FeatureBaseConfig;
};
export declare type ComponentOverrideMap = {
    EmailVerificationSendVerifyEmail_Override?: ComponentOverride<typeof SendVerifyEmail>;
    EmailVerificationVerifyEmailLinkClicked_Override?: ComponentOverride<typeof VerifyEmailLinkClicked>;
};
export declare type UserInput = UserInputForAuthRecipeModule & {
    signOut(): Promise<void>;
    redirectToSignIn(history?: any): Promise<void>;
    postVerificationRedirect(history?: any): Promise<void>;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components?: ComponentOverrideMap;
    };
};
export declare type Config = UserInput &
    RecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedConfig = {
    mode: "OFF" | "REQUIRED";
    disableDefaultUI: boolean;
    sendVerifyEmailScreen: FeatureBaseConfig;
    verifyEmailLinkClickedScreen: FeatureBaseConfig;
    signOut(): Promise<void>;
    redirectToSignIn(history?: any): Promise<void>;
    postVerificationRedirect(history?: any): Promise<void>;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components: ComponentOverrideMap;
    };
} & NormalisedRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type GetRedirectionURLContext = {
    action: "VERIFY_EMAIL";
};
export declare type PreAndPostAPIHookAction = "VERIFY_EMAIL" | "SEND_VERIFY_EMAIL" | "IS_EMAIL_VERIFIED";
export declare type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: any;
};
export declare type OnHandleEventContext = {
    action: "VERIFY_EMAIL_SENT" | "EMAIL_VERIFIED_SUCCESSFUL";
    userContext: any;
};
export declare type EmailVerificationThemeProps = {
    sendVerifyEmailScreen: SendVerifyEmailThemeProps;
    verifyEmailLinkClickedScreen?: VerifyEmailLinkClickedThemeProps;
    config: NormalisedConfig;
    userContext?: any;
};
export declare type SendVerifyEmailThemeProps = ThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    signOut: () => Promise<void>;
    onEmailAlreadyVerified: () => Promise<void>;
};
export declare type VerifyEmailLinkClickedThemeProps = ThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onContinueClicked: () => Promise<void>;
    onTokenInvalidRedirect: () => Promise<void>;
    token: string;
};
