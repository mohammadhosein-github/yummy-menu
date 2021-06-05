import { useEffect, useState } from "react";

const useFavoriteItems = () => {
  const [favoriteItems, setFavoriteItems] = useState(null);

  const toggleFavoriteItem = (itemId) => {
    const localFavoriteItems = localStorage.getItem("favoriteItems");
    const favoriteItemsArr = JSON.parse(localFavoriteItems);

    // if local value does not exits
    if (!localFavoriteItems || !Array.isArray(favoriteItemsArr)) {
      localStorage.setItem("favoriteItems", JSON.stringify([itemId]));
      setFavoriteItems([itemId]);

      return;
    }

    //if favorite items does not include target item
    if (!favoriteItems.includes(itemId)) {
      let newFavoriteItems = favoriteItemsArr;
      newFavoriteItems.push(itemId);
      localStorage.setItem("favoriteItems", JSON.stringify(newFavoriteItems));
      setFavoriteItems(newFavoriteItems);

      return;
    } else {
      //if favorite items includes target item
      let newFavoriteItems = favoriteItemsArr;
      newFavoriteItems = newFavoriteItems.filter((id) => id !== itemId);
      localStorage.setItem("favoriteItems", JSON.stringify(newFavoriteItems));
      setFavoriteItems(newFavoriteItems);

      return;
    }
  };

  useEffect(() => {
    const localFavoriteItems = localStorage.getItem("favoriteItems");
    const parsedData = JSON.parse(localFavoriteItems);

    if (!localFavoriteItems || !Array.isArray(parsedData)) return;
    setFavoriteItems(parsedData);
  }, []);

  return {
    favoriteItems,
    toggleFavoriteItem,
  };
};

export default useFavoriteItems;
