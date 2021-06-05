import Router from "next/router";

const useLogOut = () => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
    Router.push("/sign-in");
  };

  return {
    logoutHandler,
  };
};

export default useLogOut;
