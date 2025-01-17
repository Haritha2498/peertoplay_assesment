import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LiquidityPoolPage from "./Pages/LiquidityPoolPage";
// import HomePage from "./pages/HomePage"; // Example for other existing pages

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> Default Home Page */}
        <Route path="" element={<LiquidityPoolPage />} />{" "}
        {/* New Page */}
      </Routes>
    </Router>
  );
};

export default App;
