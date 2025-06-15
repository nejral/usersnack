import React, { useState } from "react";
import "./Order.css";
import {submitOrder} from "../../api";

const Order = ({ cart, onCancel, onClear }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const total = cart.reduce(
    (sum, item) =>
      sum +
      (item.pizza.price + item.extras.reduce((s, e) => s + e.price, 0)) *
        item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const orderPayload = {
        customer_name: name,
        customer_email: email,
        items: cart.map(({ pizza, extras, quantity }) => ({
          pizza_id: pizza.id,
          extras: extras.map(e => e.id),
          quantity,
        })),
        price: total,
      };

      await submitOrder(orderPayload);
      onClear();
      setSuccess(true);
    } catch (err) {
      setError("Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="orderOverlay" onClick={onCancel}>
        <div className="orderPanel" onClick={(e) => e.stopPropagation()}>
          <button className="orderClose" onClick={onCancel}>✕</button>
          <h2>Thank you! Your order was submitted.</h2>
          <button onClick={onCancel}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="orderOverlay" onClick={onCancel}>
      <div className="orderPanel" onClick={(e) => e.stopPropagation()}>
        <button className="orderClose" onClick={onCancel}>✕</button>
        <h2 className="orderTitle">Confirm Your Order</h2>

        <ul className="orderCartList">
          {cart.map((item, index) => (
            <li key={index} className="orderCartItem">
              <strong>{item.pizza.name}</strong>
              {item.extras.length > 0 && (
                <p className="orderCartExtras">
                  Extras: {item.extras.map((e) => e.name).join(", ")}
                </p>
              )}
              <p className="orderCartPrice">
                Qty: {item.quantity} × ${(
                  item.pizza.price + item.extras.reduce((s, e) => s + e.price, 0)
                ).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>

        <p className="orderTotal">Total: <strong>${total.toFixed(2)}</strong></p>

        <form className="orderForm" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </label>

          {error && <p className="orderError">{error}</p>}

          <button
            type="submit"
            className="placeOrderButton"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;
