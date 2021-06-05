import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import useError from "./useError";
import {
  validUsername,
  validAddress,
  validPhoneNumber,
} from "../utils/FormValidation";

const tokenCheckURL = "https://mohammad-hosein-server.herokuapp.com/auth/user";
const userInfoEditURI =
  "https://mohammad-hosein-server.herokuapp.com/auth/user";
const deleteUserURI = "https://mohammad-hosein-server.herokuapp.com/auth/user";

const useUserInfoEdit = () => {
  const [prevUserInfo, setPrevUserInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const { errorObj, errorHandler } = useError();

  const userInfoEditHandler = (inputName, inputValue) => {
    if (errorObj.text) return;

    //DATA VALIDATION
    if (!inputValue || inputValue === prevUserInfo[inputName]) {
      errorHandler(
        `new ${inputName.replace(/_/g, " ")} is required.`,
        "warning"
      );
      return;
    }

    if (inputName === "username") {
      const error = validUsername(inputValue);
      if (error) {
        errorHandler(error.message, "warning");
        return;
      }
    }

    if (inputName === "phone_number") {
      const error = validPhoneNumber(inputValue);
      if (error) {
        errorHandler(error.message, "warning");
        return;
      }
    }

    if (inputName === "address") {
      const error = validAddress(inputValue);
      if (error) {
        errorHandler(error.message, "warning");
        return;
      }
    }

    setUserInfo({
      ...userInfo,
      [inputName]: inputValue,
    });

    return true;
  };

  const submitNewInfo = async () => {
    if (userInfo.email === "guest-user@gmail.com") {
      errorHandler("Guest user information can not be modified", "fail");
      return;
    }

    if (userInfo === prevUserInfo) {
      errorHandler("not any of your information was changed", "warning");
      return;
    }

    const newUserInfo = Object.keys(userInfo).reduce((Obj, item) => {
      if (userInfo[item] !== prevUserInfo[item]) {
        Obj[item] = userInfo[item];
      }
      return Obj;
    }, {});

    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.put(userInfoEditURI, newUserInfo, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setPrevUserInfo(userInfo);
      errorHandler("your information updated successfully", "success");
    } catch (err) {
      errorHandler("information update failed", "fail");
    }
  };

  const deleteUserHandler = async () => {
    if (
      confirm(
        "Your Account Will be Permanently Deleted, Do You Want to Continue?"
      )
    ) {
      const token = localStorage.getItem("token");

      try {
        const { data } = await axios.delete(deleteUserURI, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        errorHandler("your account has been deleted successfully", "success");
        setTimeout(() => {
          localStorage.removeItem("token");
          Router.push("/sign-up");
        }, 2000);
      } catch (err) {
        errorHandler("account deletion failed", "fail");
      }
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem("token");

      try {
        const { data } = await axios.get(tokenCheckURL, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setPrevUserInfo(data);
        setUserInfo(data);
      } catch {
        console.log("Error...");
      }
    };

    getUserInfo();
  }, []);

  return {
    userInfo,
    submitMessage: errorObj,
    userInfoEditHandler,
    submitNewInfo,
    deleteUserHandler,
  };
};

export default useUserInfoEdit;
