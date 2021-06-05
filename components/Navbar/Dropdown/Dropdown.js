import Link from "next/link";
import { useState } from "react";

const DropdownLink = ({ icon, text, bgShape, targetLink }) => {
  return (
    <div className="dropdown-item z-index-l3 d-inline-block">
      <Link href={targetLink}>
        <a className="d-flex align-items-center">
          <img
            src={bgShape}
            alt="item background"
            className="item-bg-shape z-index-base p-absolute from-right"
          />
          <img src={icon} alt="user" className="item-icon z-index-l1" />
          <div className="item-text z-index-l1 text-cap">{text}</div>
        </a>
      </Link>
    </div>
  );
};

export default function Dropdown(props) {
  const { logoutHandler, themeIsDark, themeModeHandler } = props;

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const handleDropdownStatus = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  return (
    <div
      className={`navbar-dropdown-menu p-relative${
        themeIsDark ? " dark-theme" : ""
      }`}
    >
      <button
        onClick={() => handleDropdownStatus()}
        className={`dropdown-button p-relative d-flex justify-content-center align-items-center${
          dropdownIsOpen ? " active" : ""
        }`}
      >
        <div className="bar"></div>
        <div className="bar middle"></div>
        <div className="bar"></div>
      </button>
      <div
        className={`dropdown-items-container text-right${
          dropdownIsOpen ? " show" : ""
        }`}
      >
        <DropdownLink
          icon={"/design-utils/user.svg"}
          text={"your profile"}
          bgShape={`/design-utils/navbar-dp-${
            themeIsDark ? "dark-" : ""
          }shape-1.png`}
          targetLink={"/profile"}
        />

        <div className="dropdown-item z-index-l3 d-inline-block">
          <div
            className="d-flex cursor-pointer align-items-center"
            onClick={() => logoutHandler()}
          >
            <img
              src={`/design-utils/navbar-dp-${
                themeIsDark ? "dark-" : ""
              }shape-2.png`}
              alt="item background"
              className="item-bg-shape z-index-base p-absolute from-right"
            />
            <img
              src="/design-utils/log-out.svg"
              alt="user"
              className="item-icon z-index-l1"
            />
            <div className="item-text z-index-l1 text-cap">log out</div>
          </div>
        </div>

        <div className="dropdown-item z-index-l3 d-inline-block">
          <div className="d-flex align-items-center">
            <img
              src={`/design-utils/navbar-dp-${
                themeIsDark ? "dark-" : ""
              }shape-3.png`}
              alt="item background"
              className="item-bg-shape z-index-base w-100 h-100 p-absolute from-right"
            />
            <div className="item-text z-index-l1 cursor-none text-cap">
              theme mode
            </div>
            <div
              className={`mode-toggler z-index-l1 d-flex align-items-center justify-content-center text-cap${
                themeIsDark ? " dark-mode" : ""
              }`}
              onClick={() => themeModeHandler()}
            >
              <div className="mode-icon-container">
                <img
                  src="/design-utils/sun.svg"
                  alt="light mode"
                  className={`mode-icon${!themeIsDark ? " show" : ""}`}
                />
                <img
                  src="/design-utils/moon.svg"
                  alt="dark mode"
                  className={`mode-icon${themeIsDark ? " show" : ""}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
