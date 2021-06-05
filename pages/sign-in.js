import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import useAuthForm from "../hooks/useAuthForm";
import useTokenCheckInAuth from "../hooks/useTokenCheckInAuth";

import AuthFormPanel from "../components/AuthFormPanel/AuthFormPanel";
import Loading from "../components/Loading/Loading";
import Alert from "../components/Alerts/Alert";

export default function signIn() {
  const { isLoading } = useTokenCheckInAuth();
  const {
    formData,
    authError,
    formHandler,
    guestUser,
    signInHandler,
  } = useAuthForm({
    usernameOrEmail: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  if (!isLoading)
    return (
      <div className="auth-page">
        <Head>
          <title>Yummy Menu</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Alert text={authError.text} type={authError.type} />
        <div className="section-container h-100">
          <AuthFormPanel
            type="sign in"
            redirectLink={{
              description: "don't have an account,",
              buttonTitle: "sign up",
              to: "/sign-up",
            }}
            guestUser={guestUser}
            formData={formData}
            submitHandler={signInHandler}
          >
            <div className="input-container">
              <input
                type="text"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                placeholder="Username, Email Address"
                autoComplete="off"
                onChange={(e) => formHandler(e)}
                onKeyDown={(e) => e.key === "Enter" && signInHandler(formData)}
              />
            </div>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={(e) => formHandler(e)}
                onKeyDown={(e) => e.key === "Enter" && signInHandler(formData)}
              />
              <div
                className="input-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <div className="p-relative">
                  <img
                    src={`/design-utils/show-password.png`}
                    alt="show password"
                  />
                  {showPassword && <div className="hide-password"></div>}
                </div>
              </div>
            </div>
          </AuthFormPanel>
        </div>
      </div>
    );

  return <Loading />;
}
