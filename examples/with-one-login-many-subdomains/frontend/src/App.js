import "./App.css";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { getApiDomain, getAuthDomain, getRedirectionUrlForUser } from "./utils";

Session.addAxiosInterceptors(axios);

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getAuthDomain(),
        websiteBasePath: "/",
    },
    recipeList: [
        EmailPassword.init({
            getRedirectionURL: async (context) => {
                if (context.action === "SUCCESS") {
                    // redirect users to their associated subdomain e.g abc.example.com for user abc
                    const redirectionUrl = await getRedirectionUrlForUser();
                    return redirectionUrl;
                }
            },
        }),
        Session.init({
            sessionScope: ".example.com",
        }),
    ],
});

function App() {
    return (
        <div className="App">
            <Router>
                <div className="fill">
                    <Routes>
                        {/* Present users with login/signup when they are on auth.example.com. 
            If not try rendering our protected route. In case the user is unauthenticated 
            the auth wrapper will simply redirect them to the login page */}
                        {window.location.origin === getAuthDomain() ? (
                            getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))
                        ) : (
                            <Route
                                path="/"
                                element={
                                    <EmailPassword.EmailPasswordAuth>
                                        <Home />
                                    </EmailPassword.EmailPasswordAuth>
                                }
                            />
                        )}
                    </Routes>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
