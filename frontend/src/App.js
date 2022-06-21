import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Products from './components/Product/Products';
import SellerForm from './components/BuyerSellerForms/SellerForm';
import BuyerForm from './components/BuyerSellerForms/BuyerForm';
import ProductDetails from './components/Product/ProductDetails';
import UserOptions from './components/Header/userOptions';
import Dashboard from "./components/Seller/Dashboard";
import ProductList from './components/Seller/productList';
import NewProduct from './components/Seller/NewProduct';
import OrderList from './components/Seller/OrderList';
import UpdateOrder from './components/Seller/UpdateOrder';
import Cart from './components/Cart/Cart';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import OrderSuccess from './components/Cart/OrderSuccess';
import {useSelector} from 'react-redux';
import OrderDetails from './components/Order/OrderDetails';
import Home from './components/Home/Home';
import MyOrders from "./components/Order/MyOrders.js";
function App() {
  const {isOldUser} = useSelector((state)=> state.user);

  return (
    <>
      <Router>
        <Header />
        { isOldUser === true && <UserOptions /> }
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/seller-form" element={<SellerForm />} />
          <Route path="/buyer-form" element={<BuyerForm />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/seller/products" element={<ProductList />} />
          <Route path="/seller/product" element={<NewProduct />} />
          <Route path="/seller/orders" element={<OrderList />} />
          <Route path="/seller/order/:id"  element={<UpdateOrder />} />
          <Route path="/cart" element={< Cart />} />
          <Route path="/confirm-order" element={< ConfirmOrder />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/my-all-orders" element={<MyOrders />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
