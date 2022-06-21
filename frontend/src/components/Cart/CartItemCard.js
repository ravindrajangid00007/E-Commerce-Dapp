import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={`https://ipfs.infura.io/ipfs/${item.imgHash}`} alt="ssa" />
      <div>
        <Link to={`/product/${item.pid}`}>{item.name}</Link>
        <span>{`Price: ${item.price} eth`}</span>
        <p onClick={() => {deleteCartItems(item)}}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;