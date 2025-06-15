import React, { useEffect, useState } from "react";
import { fetchExtras } from "../api";

const detailCard = {
  maxWidth: 400,
  margin: "20px auto",
  padding: 24,
  borderRadius: 12,
  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  backgroundColor: "#fff",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const imgDetailStyle = {
  width: "100%",
  height: 200,
  objectFit: "cover",
  borderRadius: 12,
  marginBottom: 20,
};

const extrasList = {
  listStyleType: "none",
  padding: 0,
  marginBottom: 20,
  maxHeight: 150,
  overflowY: "auto",
  borderTop: "1px solid #eee",
  borderBottom: "1px solid #eee",
};

const extraItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0",
  borderBottom: "1px solid #f5f5f5",
};

const backButton = {
  marginBottom: 20,
  padding: "8px 14px",
  fontSize: 16,
  borderRadius: 6,
  cursor: "pointer",
  border: "none",
  backgroundColor: "#ddd",
  transition: "background-color 0.2s",
};

const orderButton = {
  padding: "12px 24px",
  fontSize: 18,
  fontWeight: "bold",
  borderRadius: 8,
  backgroundColor: "#ff6347",
  color: "white",
  border: "none",
  cursor: "pointer",
  width: "100%",
  transition: "background-color 0.3s",
};

const orderButtonHover = {
  backgroundColor: "#e5533d",
};

function PizzaDetail({ pizza, onBack }) {
  const [extras, setExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [orderHovered, setOrderHovered] = useState(false);

  useEffect(() => {
    fetchExtras().then((res) => setExtras(res.data));
  }, []);

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.includes(extra.name)
        ? prev.filter((e) => e !== extra.name)
        : [...prev, extra.name]
    );
  };

  const calculatePrice = () => {
    const extrasTotal = extras
      .filter((e) => selectedExtras.includes(e.name))
      .reduce((sum, e) => sum + e.price, 0);
    return pizza.price + extrasTotal;
  };

  return (
    <div style={detailCard}>
      <button
        style={backButton}
        onClick={onBack}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#ccc")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#ddd")}
      >
        ← Back
      </button>
      <h2 style={{ marginBottom: 8 }}>{pizza.name}</h2>
      <img src={`/images/${pizza.img}`} alt={pizza.name} style={imgDetailStyle} />
      <p style={{ fontStyle: "italic", color: "#555" }}>
        Ingredients: {pizza.incredients.join(", ")}
      </p>

      <h3 style={{ marginTop: 24 }}>Extras</h3>
      <ul style={extrasList}>
        {extras.map((e) => (
          <li key={e.name} style={extraItem}>
            <label>
              <input
                type="checkbox"
                checked={selectedExtras.includes(e.name)}
                onChange={() => toggleExtra(e)}
                style={{ marginRight: 8 }}
              />
              {e.name}
            </label>
            <span>+€{e.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <p style={{ fontSize: 20, fontWeight: "bold" }}>
        Total: €{calculatePrice().toFixed(2)}
      </p>
      <button
        style={orderHovered ? { ...orderButton, ...orderButtonHover } : orderButton}
        onMouseEnter={() => setOrderHovered(true)}
        onMouseLeave={() => setOrderHovered(false)}
        onClick={() => alert("Order functionality not implemented yet")}
      >
        Order
      </button>
    </div>
  );
}

export default PizzaDetail;
