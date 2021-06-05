import { useState } from "react";
import useTransition from "../../../hooks/useTransition";

export default function UserInfoInput({ passwordResetHandler, closeHandler }) {
  const [inputValues, setInputValues] = useState({
    password: "",
    newPassword: "",
    newPasswordRepeat: "",
  });

  const { setTransition } = useTransition();

  const inputHandler = (e) =>
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });

  const submitHandler = () => {
    const passwordResetSuccess = passwordResetHandler(inputValues);
    if (passwordResetSuccess) closeHandler();
  };

  return (
    <div className="user-info-input z-index-l2 d-flex align-items-center justify-content-center">
      <div
        className={setTransition(
          "input-panel w-100",
          "custom-transition opacity from-bottom-3 duration-400"
        )}
      >
        <input
          className="w-100"
          type="password"
          name="password"
          value={inputValues.password}
          placeholder="Enter Your Password"
          onChange={(e) => inputHandler(e)}
          onKeyDown={(e) => e.key === "Enter" && submitHandler()}
        />
        <input
          className="w-100"
          type="password"
          name="newPassword"
          value={inputValues.newPassword}
          placeholder="Enter Your New Password"
          onChange={(e) => inputHandler(e)}
          onKeyDown={(e) => e.key === "Enter" && submitHandler()}
        />
        <input
          className="w-100"
          type="password"
          name="newPasswordRepeat"
          value={inputValues.newPasswordRepeat}
          placeholder="Repeat Your New Password"
          onChange={(e) => inputHandler(e)}
          onKeyDown={(e) => e.key === "Enter" && submitHandler()}
        />
        <div className="buttons-container d-flex">
          <div>
            <button onClick={() => closeHandler(false)} className="red-bg">
              cancel
            </button>
          </div>
          <div>
            <button onClick={() => submitHandler()} className="blue-bg">
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
