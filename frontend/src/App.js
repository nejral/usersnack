import React, { useState } from "react";
import PizzaList from "./components/PizzaList";
import PizzaDetail from "./components/PizzaDetail";

function App() {
  const [selectedPizza, setSelectedPizza] = useState(null);

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
      {!selectedPizza ? (
        <PizzaList onSelectPizza={setSelectedPizza} />
      ) : (
        <PizzaDetail pizza={selectedPizza} onBack={() => setSelectedPizza(null)} />
      )}
    </div>
  );
}

export default App;
