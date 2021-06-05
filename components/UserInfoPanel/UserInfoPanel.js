import { useState } from "react";
import UserInfoInput from "./UserInfoInput/UserInfoInput";
import PasswordInput from "./PasswordInput/PasswordInput";

export default function UserInfoPanel({
  themeIsDark,
  userInfo,
  userInfoEditHandler,
  passwordResetHandler,
}) {
  const [activeInput, setActiveInput] = useState(null);

  const clearActiveInput = () => setActiveInput(null);

  return (
    <div className={`user-info-panel${themeIsDark ? " dark-theme" : ""}`}>
      {activeInput && activeInput !== "password" ? (
        <UserInfoInput
          inputName={activeInput}
          prevValue={userInfo[activeInput]}
          userInfoEditHandler={userInfoEditHandler}
          closeHandler={clearActiveInput}
        />
      ) : null}
      {activeInput === "password" ? (
        <PasswordInput
          closeHandler={clearActiveInput}
          passwordResetHandler={passwordResetHandler}
        />
      ) : null}
      <div className="title text-cap text-weight-bold">your profile</div>
      <div className="info-cards-container">
        {Object.keys(userInfo).map((item) => {
          if (item !== "role")
            return (
              <div key={item} className="info-card p-relative">
                <div className="card-title text-cap">
                  {item.replace(/_/g, " ")}
                </div>

                <div
                  className={
                    userInfo[item] ? "card-description" : "no-card-description"
                  }
                >
                  {userInfo[item]
                    ? userInfo[item]
                    : `No ${item.replace(/_/g, " ")}`}
                </div>

                {item !== "email" && item !== "role" ? (
                  <button
                    className="edit-btn text-cap p-absolute from-top from-right"
                    onClick={() => setActiveInput(item)}
                  >
                    {userInfo[item] ? "edit" : "add"}
                  </button>
                ) : null}
              </div>
            );
          return null;
        })}
        <div className="info-card p-relative last">
          <div
            className="password-reset-btn text-cap text-weight-bold"
            onClick={() => setActiveInput("password")}
          >
            change password
          </div>
        </div>
      </div>
    </div>
  );
}
