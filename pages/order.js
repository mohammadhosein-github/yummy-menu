import Head from "next/head";
import useTokenCheckInApp from "../hooks/useTokenCheckInApp";
import useThemeMode from "../hooks/useThemeMode";
import useLogOut from "../hooks/useLogOut";
import useOrderData from "../hooks/useOrderData";
import Link from "next/link";

import Loading from "../components/Loading/Loading";
import Alert from "../components/Alerts/Alert";
import Navbar from "../components/Navbar/Navbar";
import OrderedItemsPanel from "../components/OrderPanel/OrderedItems";
import OrderSubmit from "../components/OrderPanel/OrderSubmit";

export default function Order() {
  const { isLoading } = useTokenCheckInApp();
  const { themeIsDark, themeModeHandler } = useThemeMode();
  const { logoutHandler } = useLogOut();
  const {
    orderData,
    submitMessage,
    toggleItemInOrder,
    increaseItemQuantity,
    decreaseItemQuantity,
    submitOrder,
  } = useOrderData();

  if (isLoading) return <Loading />;
  return (
    <div
      className={`page-container order-page d-flex flex-column${
        themeIsDark ? " dark-theme" : ""
      }`}
    >
      <Head>
        <title>Yummy Menu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Alert text={submitMessage.text} type={submitMessage.type} />

      <Navbar
        logoutHandler={logoutHandler}
        themeIsDark={themeIsDark}
        themeModeHandler={themeModeHandler}
      />

      {orderData ? (
        <div className="section-container d-flex flex-column flex-fill">
          <div className="ordered-items-container flex-fill">
            <OrderedItemsPanel
              themeIsDark={themeIsDark}
              orderData={orderData}
              toggleItemInOrder={toggleItemInOrder}
              increaseItemQuantity={increaseItemQuantity}
              decreaseItemQuantity={decreaseItemQuantity}
            />
          </div>
          <OrderSubmit
            themeIsDark={themeIsDark}
            submitHandler={submitOrder}
            orderData={orderData}
          />
        </div>
      ) : (
        <div className="section-container d-flex flex-column flex-fill p-relative">
          <div className="empty-order cover-parent d-flex flex-column justify-content-center align-items-center">
            <div className="message-title text-cap text-weight-bold">
              {"no order".split("").map((l) => {
                if (l === " ") return <span className="space"></span>;
                return <span>{l}</span>;
              })}
            </div>
            <div className="redirect-link text-cap">
              <Link href="/">
                <a>go to menu</a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
