import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import useAuthForm from "../hooks/useAuthForm";
import useTokenCheckInAuth from "../hooks/useTokenCheckInAuth";

import AuthFormPanel from "../components/AuthFormPanel/AuthFormPanel";
import Loading from "../components/Loading/Loading";
import Alert from "../components/Alerts/Alert";

export default function signUp() {
  const { isLoading } = useTokenCheckInAuth();
  const {
    formData,
    authError,
    formHandler,
    guestUser,
    signUpHandler,
  } = useAuthForm({
    email: "",
    username: "",
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
            type="sign up"
            redirectLink={{
              description: "already have an account,",
              buttonTitle: "sign in",
              to: "/sign-in",
            }}
            guestUser={guestUser}
            formData={formData}
            submitHandler={signUpHandler}
          >
            <div className="input-container">
              <input
                type="text"
                name="email"
                value={formData.email}
                placeholder="Email Address"
                autoComplete="off"
                onChange={(e) => formHandler(e)}
                onKeyDown={(e) => e.key === "Enter" && signUpHandler(formData)}
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                name="username"
                autoComplete="off"
                value={formData.username}
                placeholder="Username"
                onChange={(e) => formHandler(e)}
                onKeyDown={(e) => e.key === "Enter" && signUpHandler(formData)}
              />
            </div>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={(e) => formHandler(e)}
                onKeyDown={(e) => e.key === "Enter" && signUpHandler(formData)}
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
