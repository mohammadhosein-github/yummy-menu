export default function ItemCard({
  themeIsDark,
  itemData,
  itemOrderInfo,
  isFavorite,
  toggleItemInOrder = () => {},
  increaseItemQuantity = () => {},
  decreaseItemQuantity = () => {},
  toggleFavoriteItem = () => {},
}) {
  if (!itemData) return null;
  return (
    <div className={`item-card p-relative${themeIsDark ? " dark-theme" : ""}`}>
      <img
        src={`/design-utils/item-card-${themeIsDark ? "dark-" : ""}bg.png`}
        alt="card background"
        className="background-shape"
      />
      <div className="card-content cover-parent">
        <div className="item-image">
          <img src={itemData.image} alt="item image" />
        </div>
        <button
          className="favorite-button"
          onClick={() => toggleFavoriteItem(itemData._id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="149"
            height="149"
            viewBox="0 0 149 149"
            className={`${isFavorite ? "active" : ""}`}
          >
            <defs>
              <filter
                id="Ellipse_3"
                x="0"
                y="0"
                width="149"
                height="149"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="5" input="SourceAlpha" />
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood flood-opacity="0.2" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g id="like-icon" transform="translate(-251 -262.753)">
              <g
                transform="matrix(1, 0, 0, 1, 251, 262.75)"
                filter="url(#Ellipse_3)"
              >
                <circle
                  id="Ellipse_3-2"
                  data-name="Ellipse 3"
                  cx="62.5"
                  cy="62.5"
                  r="62.5"
                  transform="translate(12 7)"
                />
              </g>
              <path
                id="heart_2_"
                data-name="heart (2)"
                d="M45.943,4.345A13.418,13.418,0,0,0,35.962,0a12.554,12.554,0,0,0-7.841,2.707,16.041,16.041,0,0,0-3.17,3.31,16.033,16.033,0,0,0-3.17-3.31A12.552,12.552,0,0,0,13.94,0,13.419,13.419,0,0,0,3.959,4.345,15.6,15.6,0,0,0,0,15c0,4.22,1.573,8.083,4.949,12.158C7.97,30.8,12.312,34.5,17.339,38.783,19.056,40.246,21,41.9,23.022,43.671a2.929,2.929,0,0,0,3.857,0c2.02-1.767,3.967-3.426,5.685-4.89C37.591,34.5,41.932,30.8,44.953,27.154,48.329,23.08,49.9,19.217,49.9,15A15.6,15.6,0,0,0,45.943,4.345Zm0,0"
                transform="translate(300.425 311.584)"
              />
            </g>
          </svg>
        </button>
        <div className="item-text secondary-font">
          <div className="title text-weight-bold text-cap">
            {itemData.title}
          </div>
          <div className="description">{itemData.description}</div>
        </div>
        <button
          className="add-button text-cap"
          onClick={() => toggleItemInOrder(itemData)}
        >
          {itemOrderInfo ? "remove item" : "add item"}
        </button>
        {itemOrderInfo ? (
          <div className="item-counter text-center">
            <button
              className="increase"
              onClick={() => increaseItemQuantity(itemData._id)}
            >
              <img
                src={`/design-utils/increase${themeIsDark ? "-dark" : ""}.svg`}
                alt="increase"
              />
            </button>
            <div className="order-number text-weight-bold">
              {itemOrderInfo.quantity}
            </div>
            <button
              className="decrease"
              onClick={() => decreaseItemQuantity(itemData._id)}
            >
              <img
                src={`/design-utils/decrease${themeIsDark ? "-dark" : ""}.svg`}
                alt="decease"
              />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
