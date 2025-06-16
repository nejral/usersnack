import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../api";
import "./Orders.css";

const Orders = ({ onBack }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders()
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="ordersPage">
      <button className="backButton" onClick={onBack}>← Back</button>
      <h2 className="ordersTitle">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="ordersList">
          {orders.map((order) => (
            <div key={order.id} className="orderCard">
              <p><strong>Customer:</strong> {order.customer_name}</p>
              <p><strong>Email:</strong> {order.customer_email}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Price:</strong> ${order.price.toFixed(2)}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    Pizza ID: {item.pizza_id}, Qty: {item.quantity}, Extras: {item.extras.join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
