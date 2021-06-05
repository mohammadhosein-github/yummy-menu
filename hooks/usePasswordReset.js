import axios from "axios";
import useError from "./useError";
import { validPassword } from "../utils/FormValidation";

const passwordResetURI =
  "https://mohammad-hosein-server.herokuapp.com/auth/password-reset";

const usePasswordReset = () => {
  const { errorObj, errorHandler } = useError();

  const checkPasswordIsValid = (passwords) => {
    const { password, newPassword, newPasswordRepeat } = passwords;

    if (!password || !newPassword || !newPasswordRepeat) {
      errorHandler(`Please complete all required fields.`, "warning");
      return;
    }

    if (password === newPassword) {
      errorHandler(
        `Please enter a different password from your current password`,
        "warning"
      );
      return;
    }

    if (newPassword !== newPasswordRepeat) {
      errorHandler(
        `New Password Repeat is not the same as New Password`,
        "warning"
      );
      return;
    }

    let error = null;

    for (const item of Object.keys(passwords)) {
      error = validPassword(passwords[item]);
      if (error) break;
    }

    if (error) {
      errorHandler(error.message, "warning");
      return;
    }

    return true;
  };

  const passwordResetHandler = (passwords) => {
    if (errorObj.text) return;

    const validPasswords = checkPasswordIsValid(passwords);
    if (!validPasswords) return;

    //RETURN TRUE IF FETCH IS SUCCESSFUL AND FALSE IF NOT
    const fetchNewPassword = async () => {
      const token = localStorage.getItem("token");
      const reqParams = {
        password: passwords.password,
        newPassword: passwords.newPassword,
      };

      try {
        const { data } = await axios.post(passwordResetURI, reqParams, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        errorHandler(data.message, "success");
        return true;
      } catch (err) {
        errorHandler("password reset failed", "fail");
        return false;
      }
    };

    return fetchNewPassword();
  };

  return {
    passwordResetMessage: errorObj,
    passwordResetHandler,
  };
};

export default usePasswordReset;
