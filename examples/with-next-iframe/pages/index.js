import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import dynamic from "next/dynamic";
import supertokensNode from "supertokens-node";
import SessionNode from "supertokens-node/recipe/session";
import SessionReact from "supertokens-auth-react/recipe/session";
import { backendConfig } from "../config/backendConfig";

const EmailPasswordAuthNoSSR = dynamic(new Promise((res) => res(EmailPassword.EmailPasswordAuth)), { ssr: false });

export async function getServerSideProps(context) {
    // this runs on the backend, so we must call init on supertokens-node SDK
    supertokensNode.init(backendConfig());
    let session;
    try {
        session = await SessionNode.getSession(context.req, context.res);
    } catch (err) {
        if (err.type === SessionNode.Error.TRY_REFRESH_TOKEN) {
            return { props: { fromSupertokens: "needs-refresh" } };
        } else if (err.type === SessionNode.Error.UNAUTHORISED) {
            return { props: {} };
        } else {
            throw err;
        }
    }

    return {
        props: { userId: session.getUserId() },
    };
}

export default function Home(props) {
    return (
        <EmailPasswordAuthNoSSR>
            <ProtectedPage />
        </EmailPasswordAuthNoSSR>
    );
}

function ProtectedPage() {
    let sessionContext = SessionReact.useSessionContext();
    async function logoutClicked() {
        await EmailPassword.signOut();
        EmailPassword.redirectToAuth();
    }

    async function fetchUserData() {
        const res = await fetch("/api/user");
        if (res.status === 401) {
            EmailPassword.redirectToAuth();
        } else {
            const json = await res.json();
            alert(JSON.stringify(json));
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>SuperTokens 💫</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>
                <p className={styles.description}>
                    You are authenticated with SuperTokens! (UserID: {sessionContext.userId})
                </p>

                <div
                    style={{
                        display: "flex",
                        height: "70px",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        paddingLeft: "75px",
                        paddingRight: "75px",
                    }}>
                    <div
                        onClick={logoutClicked}
                        style={{
                            display: "flex",
                            width: "116px",
                            height: "42px",
                            backgroundColor: "#000000",
                            borderRadius: "10px",
                            cursor: "pointer",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontWeight: "bold",
                        }}>
                        SIGN OUT
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        height: "70px",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        paddingLeft: "75px",
                        paddingRight: "75px",
                    }}>
                    <div
                        onClick={fetchUserData}
                        style={{
                            display: "flex",
                            width: "150px",
                            height: "42px",
                            backgroundColor: "rgb(247 54 54)",
                            borderRadius: "10px",
                            cursor: "pointer",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontWeight: "bold",
                        }}>
                        FETCH USER API
                    </div>
                </div>

                <div className={styles.grid}>
                    <a href="https://nextjs.org/docs" className={styles.card}>
                        <h3>Documentation &rarr;</h3>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </a>

                    <a href="https://nextjs.org/learn" className={styles.card}>
                        <h3>Learn &rarr;</h3>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </a>

                    <a href="https://github.com/vercel/next.js/tree/master/examples" className={styles.card}>
                        <h3>Examples &rarr;</h3>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </a>

                    <a
                        href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}>
                        <h3>Deploy &rarr;</h3>
                        <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
                    </a>
                </div>
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer">
                    Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                </a>
            </footer>
        </div>
    );
}
