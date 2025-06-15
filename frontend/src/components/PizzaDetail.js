import React, { useEffect, useState } from "react";
import { fetchExtras } from "../api";

const PizzaDetail = ({ pizza, onBack }) => {
  const [extras, setExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);

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
    <div style={styles.container}>
      <button
        onClick={onBack}
        style={styles.backButton}
        aria-label="Go back to pizza list"
      >
        ← Back to Menu
      </button>
      <div style={styles.card}>
        <img
          src={`/images/${pizza.img}`}
          alt={pizza.name}
          style={styles.image}
        />
        <div style={styles.details}>
          <h2 style={styles.pizzaName}>{pizza.name}</h2>
          <p style={styles.ingredients}>
            Ingredients:{" "}
            {pizza.ingredients && pizza.ingredients.length > 0
              ? pizza.ingredients.join(", ")
              : "N/A"}
          </p>
          <h3 style={styles.extrasTitle}>Extras</h3>
          <ul style={styles.extrasList}>
            {extras.map((extra) => (
              <li key={extra.name} style={styles.extraItem}>
                <label style={styles.extraLabel}>
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra.name)}
                    onChange={() => toggleExtra(extra)}
                    style={styles.checkbox}
                  />
                  {extra.name} (+€{extra.price.toFixed(2)})
                </label>
              </li>
            ))}
          </ul>
          <p style={styles.total}>
            <strong>Total:</strong> €{calculatePrice().toFixed(2)}
          </p>
          <button style={styles.orderButton} disabled>
            Order (coming soon)
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px 20px",
    maxWidth: 900,
    margin: "40px auto",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    color: "#3e3e3e",
  },
  backButton: {
    backgroundColor: "#d84315",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "1rem",
    marginBottom: 30,
    boxShadow: "0 4px 8px rgba(216,67,21,0.3)",
    transition: "background-color 0.3s ease",
  },
  card: {
    display: "flex",
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    overflow: "hidden",
  },
  image: {
    width: "40%",
    objectFit: "cover",
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  details: {
    padding: 24,
    width: "60%",
    display: "flex",
    flexDirection: "column",
  },
  pizzaName: {
    marginTop: 0,
    fontSize: "2rem",
    fontWeight: 700,
    color: "#d84315",
  },
  ingredients: {
    fontStyle: "italic",
    color: "#777",
    marginTop: 8,
    marginBottom: 24,
  },
  extrasTitle: {
    marginBottom: 12,
    fontSize: "1.3rem",
    fontWeight: 600,
    color: "#4a4a4a",
  },
  extrasList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    marginBottom: 20,
  },
  extraItem: {
    marginBottom: 10,
  },
  extraLabel: {
    cursor: "pointer",
    fontSize: "1rem",
    color: "#444",
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 12,
    width: 18,
    height: 18,
  },
  total: {
    fontWeight: 700,
    fontSize: "1.25rem",
    color: "#222",
    marginBottom: 20,
  },
  orderButton: {
    backgroundColor: "#d84315",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "14px 24px",
    cursor: "not-allowed",
    fontWeight: 700,
    fontSize: "1.1rem",
    boxShadow: "0 6px 12px rgba(216,67,21,0.4)",
    userSelect: "none",
  },
};

export default PizzaDetail;
