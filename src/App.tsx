import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HeaderBar from "./components/HeaderBar";
import AddProduct from "./views/product/add";
import EditProduct from "./views/product/edit";

const Home = React.lazy(() => import("./views/Home"));
const ProductPage = React.lazy(() => import("./views/product"));

function App() {
  return (
    <Router>
      <div>
        <HeaderBar />

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/add" element={<AddProduct />} />
            <Route path="/product/:id" element={<EditProduct />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
