import Head from "next/head";
import useTokenCheckInApp from "../hooks/useTokenCheckInApp";
import useThemeMode from "../hooks/useThemeMode";
import useLogOut from "../hooks/useLogOut";
import useOrderData from "../hooks/useOrderData";
import usePasswordReset from "../hooks/usePasswordReset";
import useUserInfoEdit from "../hooks/useUserInfoEdit";

import Loading from "../components/Loading/Loading";
import Navbar from "../components/Navbar/Navbar";
import UserInfoPanel from "../components/UserInfoPanel/UserInfoPanel";
import Alert from "../components/Alerts/Alert";

export default function Profile() {
  const { isLoading } = useTokenCheckInApp();
  const { themeIsDark, themeModeHandler } = useThemeMode();
  const { logoutHandler } = useLogOut();
  const { ordersNumber } = useOrderData();
  const { passwordResetMessage, passwordResetHandler } = usePasswordReset();
  const {
    userInfo,
    submitMessage,
    userInfoEditHandler,
    submitNewInfo,
    deleteUserHandler,
  } = useUserInfoEdit();

  if (isLoading) return <Loading />;
  return (
    <div
      className={`page-container user-page d-flex flex-column${
        themeIsDark ? " dark-theme" : ""
      }`}
    >
      <Head>
        <title>Yummy Menu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        ordersNumber={ordersNumber}
        logoutHandler={logoutHandler}
        themeIsDark={themeIsDark}
        themeModeHandler={themeModeHandler}
      />

      <Alert text={submitMessage.text} type={submitMessage.type} />
      <Alert
        text={passwordResetMessage.text}
        type={passwordResetMessage.type}
      />
      <div className="section-container d-flex flex-column flex-fill">
        <div className="flex-fill">
          {userInfo ? (
            <UserInfoPanel
              themeIsDark={themeIsDark}
              userInfo={userInfo}
              userInfoEditHandler={userInfoEditHandler}
              submitNewInfo={submitNewInfo}
              passwordResetHandler={passwordResetHandler}
            />
          ) : (
            <Loading />
          )}
        </div>
        <div className="submit-buttons">
          <button
            className="delete-btn text-cap text-weight-bold"
            onClick={() => deleteUserHandler()}
          >
            delete account
          </button>
          <button
            className="submit-btn text-cap text-weight-bold"
            onClick={() => submitNewInfo()}
          >
            save changes
          </button>
        </div>
      </div>
    </div>
  );
}
