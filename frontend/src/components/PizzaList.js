import React, { useEffect, useState } from "react";
import { fetchPizzas } from "../api";

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 16,
  margin: 12,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  cursor: "pointer",
  maxWidth: 220,
  textAlign: "center",
  transition: "transform 0.2s",
  backgroundColor: "#fff",
};

const cardHover = {
  transform: "scale(1.05)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
};

const imgStyle = {
  borderRadius: "8px",
  width: "100%",
  height: "140px",
  objectFit: "cover",
  marginBottom: 12,
};

const listContainer = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

function PizzaList({ onSelectPizza }) {
  const [pizzas, setPizzas] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    fetchPizzas().then((res) => setPizzas(res.data));
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: 20 }}>Available Pizzas</h2>
      <div style={listContainer}>
        {pizzas.map((p) => (
          <div
            key={p.id}
            style={{
              ...cardStyle,
              ...(hoveredId === p.id ? cardHover : {}),
            }}
            onClick={() => onSelectPizza(p)}
            onMouseEnter={() => setHoveredId(p.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img src={`/images/${p.img}`} alt={p.name} style={imgStyle} />
            <h3 style={{ margin: "8px 0" }}>{p.name}</h3>
            <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              €{p.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PizzaList;
