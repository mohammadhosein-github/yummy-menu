import axios from "axios";
import Head from "next/head";
import useThemeMode from "../hooks/useThemeMode";
import useTokenCheckInApp from "../hooks/useTokenCheckInApp";
import useLogOut from "../hooks/useLogOut";
import useMenuData from "../hooks/useMenuData";
import useOrderData from "../hooks/useOrderData";
import useFavoriteItems from "../hooks/useFavoriteItems";

import Alert from "../components/Alerts/Alert";
import Loading from "../components/Loading/Loading";
import Navbar from "../components/Navbar/Navbar";
import CardsMenu from "../components/CardsMenu/CardsMenu";
import TypeMenu from "../components/TypeMenu/TypeMenu";

export default function Home({ fetchedData }) {
  const { themeIsDark, themeModeHandler } = useThemeMode();
  const { isLoading } = useTokenCheckInApp();
  const { logoutHandler } = useLogOut();
  const { menuData, activeType, menuDataError, activeTypeHandler } =
    useMenuData(fetchedData);
  const {
    orderData,
    ordersNumber,
    toggleItemInOrder,
    increaseItemQuantity,
    decreaseItemQuantity,
  } = useOrderData();
  const { favoriteItems, toggleFavoriteItem } = useFavoriteItems();

  if (isLoading) return <Loading />;
  return (
    <div
      className={`page-container menu-page d-flex flex-column${
        themeIsDark ? " dark-theme" : ""
      }`}
    >
      <Head>
        <title>Yummy Menu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Alert text={menuDataError.text} type={menuDataError.type} />

      <Navbar
        ordersNumber={ordersNumber}
        logoutHandler={logoutHandler}
        themeIsDark={themeIsDark}
        themeModeHandler={themeModeHandler}
      />

      <div className="menu-container d-flex flex-column flex-fill">
        <div className="flex-fill">
          {menuData !== null ? (
            <CardsMenu
              themeIsDark={themeIsDark}
              menuData={menuData[`${activeType}`]}
              orderData={orderData}
              favoriteItems={favoriteItems}
              toggleItemInOrder={toggleItemInOrder}
              increaseItemQuantity={increaseItemQuantity}
              decreaseItemQuantity={decreaseItemQuantity}
              toggleFavoriteItem={toggleFavoriteItem}
            />
          ) : (
            <Loading />
          )}
        </div>
        <div>
          <TypeMenu
            themeIsDark={themeIsDark}
            activeType={activeType}
            activeTypeHandler={activeTypeHandler}
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(
    `https://mohammad-hosein-server.herokuapp.com/yummy-menu/menu/main`
  );

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      fetchedData: data,
    },
  };
}
