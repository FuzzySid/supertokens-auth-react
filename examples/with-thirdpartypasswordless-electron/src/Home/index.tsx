import React from "react";
import Logout from "./logout";
import SuccessView from "./successView";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/thirdpartypasswordless";

export default function Home() {
    const { userId } = useSessionContext();
    const navigate = useNavigate();

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }

    return (
        <div className="fill">
            <Logout logoutClicked={logoutClicked} />
            <SuccessView userId={userId} />
        </div>
    );
}
