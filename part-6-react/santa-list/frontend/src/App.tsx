import React from "react";
import "./App.css";
import { GiftsList } from "./components/Gift/GiftsList";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GiftsList />
      </BrowserRouter>
    </div>
  );
}

export default App;
