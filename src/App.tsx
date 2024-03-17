import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';

const Home = React.lazy(() => import('./views/Home'));
const ProductsPage = React.lazy(() => import('./views/ProductsPage'));

function App() {
  return (
    <Router>
      <div>
        <HeaderBar/>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
