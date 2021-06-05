import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";

const tokenCheckURL = "https://mohammad-hosein-server.herokuapp.com/auth/user";

const useTokenCheckInApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const checkToken = async (token) => {
    if (!token) {
      Router.push("/sign-in");
      return;
    }

    try {
      const { data } = await axios.get(tokenCheckURL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUserData(data);
      setIsLoading(false);
    } catch {
      localStorage.removeItem("token");
      Router.push("/sign-in");
    }
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    checkToken(localToken);
  }, []);

  return {
    isLoading,
    userData,
  };
};

export default useTokenCheckInApp;
