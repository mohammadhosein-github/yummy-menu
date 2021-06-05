import { useState } from "react";

const useError = () => {
  const [errorObj, setErrorObj] = useState({
    text: "",
    type: "",
  });

  const errorHandler = (text = "", type = "") => {
    setErrorObj({
      text,
      type,
    });

    setTimeout(() => {
      setErrorObj({ text: "", type: "" });
    }, 3000);
  };

  return {
    errorObj,
    errorHandler,
  };
};

export default useError;
