import { useState, useEffect } from "react";

export default function OrderSubmit({
  themeIsDark,
  submitHandler,
  orderData = null,
}) {
  const [totalCost, setTotalCost] = useState(null);
  const deliveryCost = 0;

  const calcTotalCost = (itemsArr) => {
    return itemsArr.reduce((total, item) => {
      const itemCost = item.quantity * item.price;
      return total + itemCost;
    }, 0);
  };

  useEffect(() => {
    if (!orderData) return;
    setTotalCost(calcTotalCost(orderData.items));
  }, [orderData]);

  return (
    <div className={`order-submit${themeIsDark ? " dark-theme" : ""}`}>
      <div className="cost-items-container">
        <div className="cost-item d-flex justify-space-between">
          <div className="item-title">delivery fee</div>
          <div className="item-cost">
            {deliveryCost === 0 ? "free" : deliveryCost}
          </div>
        </div>
        <div className="cost-item d-flex justify-space-between">
          <div className="item-title">total price</div>
          <div className="item-cost">
            {totalCost ? totalCost.toFixed(2) : "0"} $
          </div>
        </div>
      </div>
      <button className="checkout-btn" onClick={() => submitHandler()}>
        checkout
      </button>
    </div>
  );
}
