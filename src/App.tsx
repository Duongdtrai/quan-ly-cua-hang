import "@shopify/polaris/build/esm/styles.css";
import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import HeaderBar from "./components/HeaderBar";
import AddProduct from "./views/product/add";
import EditProduct from "./views/product/edit";

const Home = React.lazy(() => import("./views/Home"));
const ProductPage = React.lazy(() => import("./views/product"));
const OrdersPage = React.lazy(() => import("./views/OrdersPage"));
function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Router>
        <div>
          <HeaderBar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/product/add" element={<AddProduct />} />
              <Route path="/product/:id" element={<EditProduct />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
