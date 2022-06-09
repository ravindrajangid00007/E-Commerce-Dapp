import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Products from './components/Product/Products';
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
