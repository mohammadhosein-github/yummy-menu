import React, { useEffect, useState } from "react";

export default function Alert({ text = "", type = "" }) {
  const [alterMessage, setAlertMessage] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    //CHECK IF ALTER TEXT IS PASSED TO COMPONENT
    if (text && typeof text === "string") {
      setAlertMessage(text);
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [text]);
  return (
    <div
      className={`alert-panel text-cap z-index-l3 ${type}${
        isActive ? " active" : ""
      }`}
    >
      {alterMessage}
    </div>
  );
}
