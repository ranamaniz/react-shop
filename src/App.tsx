import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductDetails from "./components/Products/ProductDetails";
import ProductList from "./components/Products/ProductList";

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ flex: 1, overflowY: "auto" }}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route
              path="*"
              element={
                <div style={{ padding: "20px" }}>
                  Please select a product from the list.
                </div>
              }
            />
          </Routes>
        </div>

        <ProductList />
      </div>
    </Router>
  );
};

export default App;
