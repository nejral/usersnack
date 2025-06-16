import React, { useState } from "react";
import PizzaList from "./components/PizzaList/PizzaList";
import PizzaDetail from "./components/PizzaDetail/PizzaDetail";
import Login from "./components/Login/Login";
import "./global.css";
import Cart from "./components/Cart/Cart";
import cartIcon from "./icons/cart.svg";
import Order from "./components/Order/Order";
import Orders from "./components/Orders/Order";

function App() {
  const [cart, setCart] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showOrderPage, setShowOrderPage] = useState(false);
  const [showOrdersPage, setShowOrdersPage] = useState(false);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setIsAdmin(user.admin);
  };

  const handleAddToCart = (pizza, extras) => {
  setCart((prev) => {
    const key = JSON.stringify({ pizzaId: pizza.id, extras: extras.map(e => e.name).sort() });
    const existing = prev.find(item =>
      JSON.stringify({ pizzaId: item.pizza.id, extras: item.extras.map(e => e.name).sort() }) === key
    );

    if (existing) {
      return prev.map(item =>
        item === existing ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      return [...prev, { pizza, extras, quantity: 1 }];
    }
  });
};

const handleIncrease = (item) => {
  setCart((prev) =>
    prev.map((i) =>
      i === item ? { ...i, quantity: i.quantity + 1 } : i
    )
  );
};

const handleDecrease = (item) => {
  setCart((prev) =>
    item.quantity === 1
      ? prev.filter((i) => i !== item)
      : prev.map((i) =>
          i === item ? { ...i, quantity: i.quantity - 1 } : i
        )
  );
};

 return (
    <div
    style={{
      minHeight: "100vh",
      backgroundColor: "#fff5f0",
      paddingBottom: 40,
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    }}
    >
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : showOrdersPage ? (
        <Orders onBack={() => setShowOrdersPage(false)} />
      ) : !selectedPizza ? (
        <>
          <PizzaList
            onSelectPizza={setSelectedPizza}
            onLogout={() => {
              setIsLoggedIn(false);
              setIsAdmin(false);
            }}
          />
{isLoggedIn && isAdmin && (
  <div
    style={{
      position: "fixed",
      top: 100,
      right: 20,
      zIndex: 1000,
    }}
  >
    <button
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#d84315",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
      onClick={() => setShowOrdersPage(true)}
    >
      Orders
    </button>
  </div>
)}

        </>
      ) : (
        <PizzaDetail
          pizza={selectedPizza}
          onBack={() => setSelectedPizza(null)}
          onAddToCart={(pizza, extras) => {
            setSelectedPizza(null);
            handleAddToCart(pizza, extras);
          }}
          onOrder={() => {
            setSelectedPizza(null);
            setShowOrderPage(true);
          }}
        />
      )}

      {isLoggedIn && (
        <button
          className="cartIconButton"
          onClick={() => setShowCart(true)}
          aria-label="View Cart"
        >
          <img src={cartIcon} alt="Cart" className="cartIconImage" />
          {cart.length > 0 && <span className="cartBadge">{cart.length}</span>}
        </button>
      )}
      {isLoggedIn && showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onClear={() => setCart([])}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onStartOrder={() => {
            setShowCart(false);
            setShowOrderPage(true);
          }}
        />
      )}
      {isLoggedIn && showOrderPage && (
        <Order
          cart={cart}
          onSubmit={(order) => {
            console.log("Order submitted:", order);
            setCart([]);
            setShowOrderPage(false);
          }}
          onCancel={() => setShowOrderPage(false)}
          onClear={() => setCart([])}
        />
      )}
    </div>
  );
}

export default App;