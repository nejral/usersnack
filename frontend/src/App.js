import React, { useState } from "react";
import PizzaList from "./components/PizzaList";
import PizzaDetail from "./components/PizzaDetail";

function App() {
  const [selectedPizza, setSelectedPizza] = useState(null);

  return (
    <div className="App">
      <h1>Usersnack Pizza Delivery</h1>
      {!selectedPizza ? (
        <PizzaList onSelectPizza={setSelectedPizza} />
      ) : (
        <PizzaDetail pizza={selectedPizza} onBack={() => setSelectedPizza(null)} />
      )}
    </div>
  );
}

export default App;
