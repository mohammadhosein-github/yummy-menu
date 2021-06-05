import Link from "next/link";
import Dropdown from "./Dropdown/Dropdown";

export default function Navbar(props) {
  const { ordersNumber, logoutHandler, themeIsDark, themeModeHandler } = props;

  return (
    <div className={`navbar z-index-l2${themeIsDark ? " dark-theme" : ""}`}>
      <div className="left-side">
        <Link href="/">
          <img
            src="/logo/logo-light.svg"
            alt="yummy menu"
            className="cursor-pointer company-logo"
          />
        </Link>
      </div>
      <div className="right-side d-flex align-items-center">
        {ordersNumber !== undefined ? (
          <Link href="/order">
            <a className="shopping-card p-relative">
              <img src="/design-utils/shop-card.svg" alt="orders basket" />
              {ordersNumber ? (
                <div className="orders-number p-absolute d-flex justify-content-center align-items-center">
                  <span className="text-weight-bold text-color-light">
                    {ordersNumber}
                  </span>
                </div>
              ) : null}
            </a>
          </Link>
        ) : null}
        <Dropdown
          logoutHandler={logoutHandler}
          themeIsDark={themeIsDark}
          themeModeHandler={themeModeHandler}
        />
      </div>
    </div>
  );
}
