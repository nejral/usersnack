import React, { useEffect, useState } from "react";
import { fetchPizzas } from "../../api";
import "./PizzaList.css";

const PizzaList = ({ onSelectPizza, onLogout }) => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetchPizzas().then((res) => setPizzas(res.data));
  }, []);

  return (
    <div className="page">
        <h1 className="title">Pizza Service - Usersnack</h1>
      <div className="grid">
        {pizzas.map((pizza) => (
          <div
            key={pizza.id}
            className="card"
            onClick={() => onSelectPizza(pizza)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelectPizza(pizza);
            }}
          >
            <div className="info">
              <h3 className="pizzaName">{pizza.name}</h3>
              <p className="ingredients">
                {Array.isArray(pizza.ingredients)
                  ? pizza.ingredients.join(", ")
                  : pizza.ingredients}
              </p>
              <p className="price">${pizza.price.toFixed(2)}</p>
            </div>
            <div className="imgWrapper">
              <img
                src={`/images/${pizza.img}`}
                alt={pizza.name}
                className="image"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="logoutButtonWrapper">
      <button className="logoutButton" onClick={onLogout}>
          Logout
      </button>
      </div>
    </div>

  );
};


export default PizzaList;
