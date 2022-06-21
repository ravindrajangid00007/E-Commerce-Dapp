import React from 'react';
import './Cart.css';
import CartItemCard from './CartItemCard.js';
import { useSelector , useDispatch } from 'react-redux';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {addItemToCart , removeItemFromCart} from "../../state/slices/cart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import {useNavigate} from 'react-router-dom';
const Web3 = require('web3');
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQuantity = (item , quantity , stock) => {
    const newQuantity = quantity + 1;
    if(quantity < stock) {
      dispatch(addItemToCart({...item , quantity: newQuantity}));
    }
  }
  const decreaseQuantity = (item , quantity) => {
    const newQuantity = quantity - 1;
    if(1 >= quantity) {
      return ;
    }
    dispatch(addItemToCart({...item,quantity:newQuantity}));
  };

  const deleteCartItems = (item) => {
    dispatch(removeItemFromCart(item));
  };

  const checkoutHandler = () => {
    navigate("/confirm-order");
  }
  return <>
    {cartItems.length === 0 ? (
      <div className="emptyCart">
        <RemoveShoppingCartIcon />
        <Typography>No Product in Your Cart</Typography>
        <Link to="/products">View Products</Link>
      </div>
    ) : (
      <>
        <div className="cartPage">
          <div className="cartHeader">
            <p >Products</p>
            <p >Quantity</p>
            <p >Subtotal</p>
          </div>
          {cartItems && cartItems.map((item) => (
            <div className="cartContainer" key={item.pid} >
              <CartItemCard item={item} deleteCartItems={deleteCartItems}/>
              <div className="cartInput">
                <button onClick={() => decreaseQuantity(item , item.quantity)}>
                  -
                </button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={() => increaseQuantity(item , item.quantity , item.stock)}>
                  +
                </button>
              </div>
              <p className="cartSubtotal">{`${Web3.utils.fromWei(`${item.price * item.quantity}`, 'ether')}`} eth</p>
            </div>
          ))}
          <div className="cartGrossPorfit">
            <div></div>
            <div className="cartGrossProfitBox">
              <p>Gross Total</p>
              <p>{`${cartItems.reduce(
                (acc, item) => acc + item.quantity * Web3.utils.fromWei(item.price, 'ether'), 0
              )} eth`}</p>
            </div>
            <div></div>
            <div className="checkOutBtn">
              <button onClick={checkoutHandler}>Check Out</button>
            </div>
          </div>
        </div>
      </>
    )}
  </>
};

export default Cart;
