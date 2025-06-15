import React, { useEffect, useState } from "react";
import { fetchExtras } from "../../api";
import "./PizzaDetail.css";

const PizzaDetail = ({ pizza, onBack, onAddToCart, onOrder }) => {
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
    <div className="pizzaDetailContainer">
      <button
        onClick={onBack}
        className="pizzaDetailBackButton"
        aria-label="Go back to pizza list"
      >
        ← Back to Menu
      </button>
      <div className="pizzaDetailCard">
        <img
          src={`/images/${pizza.img}`}
          alt={pizza.name}
          className="pizzaDetailImage"
        />
        <div className="pizzaDetailDetails">
          <h2 className="pizzaDetailName">{pizza.name}</h2>
          <p className="pizzaDetailIngredients">
            Ingredients:{" "}
            {pizza.ingredients && pizza.ingredients.length > 0
              ? pizza.ingredients.join(", ")
              : "N/A"}
          </p>
          <h3 className="pizzaDetailExtrasTitle">Extras</h3>
          <ul className="pizzaDetailExtrasList">
            {extras.map((extra) => (
              <li key={extra.name} className="pizzaDetailExtraItem">
                <label className="pizzaDetailExtraLabel">
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra.name)}
                    onChange={() => toggleExtra(extra)}
                    className="pizzaDetailCheckbox"
                  />
                  {extra.name} (+${extra.price.toFixed(2)})
                </label>
              </li>
            ))}
          </ul>
          <p className="pizzaDetailTotal">
            <strong>Total:</strong> ${calculatePrice().toFixed(2)}
          </p>
          <button className="pizzaDetailOrderButton" onClick={() => {
            onAddToCart(pizza, extras.filter((e) => selectedExtras.includes(e.name)));
            onOrder();
          }}>
            Order
          </button>
          <button
            className="pizzaDetailAddToCartButton"
            onClick={() => onAddToCart(pizza, extras.filter((e) => selectedExtras.includes(e.name)))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetail;
