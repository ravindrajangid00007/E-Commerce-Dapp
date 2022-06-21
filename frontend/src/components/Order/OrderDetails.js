import React, { Fragment, useEffect, useState } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { useParams } from 'react-router-dom';
import { ecommerce, address } from '../../configurations/web3';
const Web3 = require('web3');
const OrderDetails = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [product, setProduct] = useState({});
  useEffect(() => {
    ecommerce.methods.getOrderById(id).call({ from: address })
      .then((order) => {
        setOrder(order);
        ecommerce.methods.getProduct(order.pid).call()
          .then((product) => {
            setProduct(product);
          })
        console.log("order R =", order);
        console.log("product R =", product);
      });
  }, []);
  const handleConfimOrderDelivered = () => {
    if(window.confirm("By clicking this button you accept that you got your order delivered")){
      ecommerce.methods.confirmation(order.ordId).send({from:address})
      .on('receipt' , (r)=> {
        setOrder({...order , paymentStatus: true , orderStatus: "delivered"});
      })
      .on("error" , (err)=> {
        console.log(err);
      })
    }
  }
  return (
    <Fragment>
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
          <Typography component="h1">
            Order #{order && id}
          </Typography>

          <Typography>{`PaymentID: ${order.pmtId}`}</Typography>

          <Typography className={
            order.orderStatus && order.orderStatus === "delivered"
              ? "greenColor"
              : "redColor"
          }>{`Order Status: ${order.orderStatus}`}</Typography>
        </div>

        <div className="orderDetailsCartItems">
          <Typography>Order Item:</Typography>
          <div className="orderDetailsCartItemsContainer">
            <div key={order.pid}>
              <img src={`https://ipfs.infura.io/ipfs/${product.imgHash}`} alt="Product" />
              <Link to={`/product/${product.pid}`}>
                {product.name}
              </Link>{" "}
              <span>
                {order.qnt} X {product.price > 0 &&  Web3.utils.fromWei(product.price, 'ether')} eth ={" "}
                <b>{Web3.utils.fromWei(`${product.price ? product.price * order.qnt : 0}`, 'ether')} eth</b>
                
              </span>
            </div>
          </div>
          {order.paymentStatus === false &&
            <button onClick={handleConfimOrderDelivered} className="userSideConfirmation">Confirm Order</button>
          }
        </div>
      </div>
    </Fragment>
  )
};

export default OrderDetails;