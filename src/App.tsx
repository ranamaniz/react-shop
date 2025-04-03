import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/Products/ProductList";
import ProductDetails from "./components/Products/ProductDetails";

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

        <div
          style={{
            width: "300px",
            borderLeft: "1px solid #ccc",
            padding: "20px",
          }}
        >
          <ProductList />
        </div>
      </div>
    </Router>
  );
};

export default App;
