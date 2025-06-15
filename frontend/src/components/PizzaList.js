import React, { useEffect, useState } from "react";
import { fetchPizzas } from "../api";

const PizzaList = ({ onSelectPizza }) => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetchPizzas().then((res) => setPizzas(res.data));
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Our Delicious Pizzas</h1>
      <div style={styles.grid}>
        {pizzas.map((pizza) => (
          <div
            key={pizza.id}
            style={styles.card}
            onClick={() => onSelectPizza(pizza)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelectPizza(pizza);
            }}
          >
            <div style={styles.imgWrapper}>
              <img
                src={`/images/${pizza.img}`}
                alt={pizza.name}
                style={styles.image}
                loading="lazy"
              />
            </div>
            <div style={styles.info}>
              <h3 style={styles.pizzaName}>{pizza.name}</h3>
              <p style={styles.price}>€{pizza.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "40px 20px",
    maxWidth: 1200,
    margin: "0 auto",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    color: "#2c2c2c",
  },
  title: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: "2.5rem",
    marginBottom: 40,
    color: "#d84315",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 30,
  },
  card: {
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)",
    cursor: "pointer",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },
  imgWrapper: {
    overflow: "hidden",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  image: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    display: "block",
    transition: "transform 0.3s ease",
  },
  info: {
    padding: 20,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  pizzaName: {
    margin: 0,
    fontWeight: 700,
    fontSize: "1.3rem",
    color: "#4e342e",
  },
  price: {
    marginTop: 12,
    fontWeight: 600,
    fontSize: "1.1rem",
    color: "#d84315",
  },
};

export default PizzaList;
