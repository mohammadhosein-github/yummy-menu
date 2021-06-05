import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";

const tokenCheckURL = "https://mohammad-hosein-server.herokuapp.com/auth/user";

const useTokenCheckInAuth = () => {
  const [isLoading, setIsLoading] = useState(true);

  const checkToken = async (token) => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(tokenCheckURL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      Router.push("/");
    } catch {
      localStorage.removeItem("token");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    checkToken(localToken);
  }, []);

  return {
    isLoading,
  };
};

export default useTokenCheckInAuth;
