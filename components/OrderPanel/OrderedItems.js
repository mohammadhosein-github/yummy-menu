import useTransition from "../../hooks/useTransition";

export default function OrderedItems({
  themeIsDark,
  orderData,
  toggleItemInOrder,
  increaseItemQuantity,
  decreaseItemQuantity,
}) {
  const { setTransition } = useTransition();

  return (
    <div className={`ordered-items${themeIsDark ? " dark-theme" : ""}`}>
      <div className="title text-cap text-weight-bold">your order</div>
      {orderData.items.map((item, index) => {
        return (
          <div
            className={setTransition(
              "card-container p-relative",
              `custom-transition opacity duration-500 from-right-3 delay-${
                (index + 1) * 100
              }`
            )}
          >
            <img
              src={`/design-utils/order-card${themeIsDark ? "-dark" : ""}.png`}
              className="bg-shape w-100"
              alt="card background"
            />
            <div className="card-content cover-parent d-flex">
              <div className="item-image text-center">
                <img src={item.image} alt="item" />
              </div>
              <div
                style={{
                  alignSelf: "center",
                  marginLeft: "15px",
                  marginTop: "15px",
                }}
              >
                <div className="item-title secondary-font text-weight-bold">
                  {item.title}
                </div>
                <div className="counter d-flex justify-space-between align-items-center">
                  <button
                    onClick={() => increaseItemQuantity(item._id)}
                    className="increase"
                  >
                    <img
                      src={`/design-utils/increase${
                        themeIsDark ? "-dark" : ""
                      }.svg`}
                      alt="increase"
                    />
                  </button>
                  <div className="number-of-orders text-weight-bold">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() => decreaseItemQuantity(item._id)}
                    className="decrease"
                  >
                    <img
                      src={`/design-utils/decrease${
                        themeIsDark ? "-dark" : ""
                      }.svg`}
                      alt="decrease"
                    />
                  </button>
                </div>
              </div>
              <div className="item-cost p-absolute text-weight-bold">
                {(item.price * item.quantity).toFixed(2)}$
                <span className="discount p-absolute from-top from-right">
                  -{item.discount}%
                </span>
              </div>
              <div
                className="remove-btn p-absolute"
                onClick={() => toggleItemInOrder(item)}
              >
                <img
                  src={`/design-utils/remove${themeIsDark ? "-dark" : ""}.png`}
                  alt="remove button"
                  className="w-100"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
