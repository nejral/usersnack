import React from "react";
import "./Cart.css";

const Cart = ({ cart, onClose, onClear, onIncrease, onDecrease, onStartOrder }) => {

  return (
    <div className="cartOverlay" onClick={onClose}>
  <div className="cartPanel" onClick={(e) => e.stopPropagation()}>
    <button className="cartClose" onClick={onClose}>✕</button>
    <h2 className="cartTitle">Your Cart</h2>

    {cart.length === 0 ? (
      <p className="cartEmpty">Your cart is empty.</p>
    ) : (
      <ul className="cartList">
        {cart.map((item, index) => (
          <li key={index} className="cartItem">
            <strong>{item.pizza.name}</strong>
            {item.extras.length > 0 && (
              <div className="cartExtras">
                Extras: {item.extras.map(e => e.name).join(", ")}
              </div>
            )}
            <div className="cartQuantityControls">
                <button onClick={() => onDecrease(item)} className="qtyBtn">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => onIncrease(item)} className="qtyBtn">+</button>
            </div>
            <span className="cartItemPrice">
            $ {(
                (item.pizza.price +
                item.extras.reduce((s, e) => s + e.price, 0)) *
                item.quantity
            ).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    )}

    <div className="cartFooter">
      <p className="cartTotal">
        Total: <strong>$
        {cart.reduce((sum, item) => sum + item.quantity * (item.pizza.price + item.extras.reduce((s, e) => s + e.price, 0)), 0).toFixed(2)}
        </strong>
      </p>
      {cart.length > 0 && (
      <button className="cartOrderButton" onClick={onStartOrder}>
        Order
      </button>
      )}
      {cart.length > 0 && (
        <button className="cartClearButton" onClick={onClear}>
          Clear Cart
        </button>
      )}
    </div>
  </div>
</div>

  );
};

export default Cart;
