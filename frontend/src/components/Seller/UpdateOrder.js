import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
// import {
//     orderDetails,
//     clearErrors,
//     updateOrder,
// } from "../../state/action-creators/orderAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import "./UpdateOrder.css";
import { useParams } from 'react-router-dom';
import { ecommerce, address } from '../../configurations/web3'
const Web3 = require('web3');

const ProcessOrder = () => {
    // const { order, error, loading } = useSelector((state) => state.orderDetailsReducer);
    // const navigate = useNavigate();
    const [updateError, setUpdateError] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [user , setUser] = useState({});
    const alert = useAlert();

    const [status, setStatus] = useState("");
    const [order, setOrder] = useState({});
    const [product, setProduct] = useState({});

    const { id } = useParams();
    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);
        ecommerce.methods.updateOrderStatus(order.ordId , order.buyerAdd , status).send({from : address})
        .on('receipt' , (r) => {
            setOrder({...order , orderStatus: status});
        })
        .on('error' , (err) => {
            console.log(err);
        })

    };

    

    useEffect(() => {

        if (updateError === true) {
            alert.error(updateError);
            setUpdateError(false);
        }
        if (isUpdated === true) {
            alert.success("Order Updated Successfully");
            setIsUpdated(false);
        }

        ecommerce.methods.getOrderById(id).call({ from: address })
            .then((order) => {
                setOrder(order);
                ecommerce.methods.getProduct(order.pid).call()
                    .then((product) => {
                        setProduct(product);
                        ecommerce.methods.getBuyerInfo(order.buyerAdd).call()
                            .then((user) => {
                                console.log("User" , user);
                                setUser(user);
                            });
                    });
                console.log("ORder", order);
            });
        // dispatch(orderDetails(id));
    }, [alert, updateError, id, isUpdated, updateError]);

    return (
        <Fragment>
            <div className="dashboardPage">
                <SideBar />
                <div className="dashboardContainer">

                    <div
                        className="confirmOrderPage"
                        style={{
                            display: order.orderStatus === "delivered" ? "block" : "grid",
                        }}
                    >
                        <div>
                            <div className="confirmshippingArea">
                                <Typography>Shipping Info</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p>Name:</p>
                                        {/* <span>{order.user && order.user.name}</span> */}
                                        <span>{user.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>
                                            +918949392910
                                        </span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>
                                            {user.deliveryAdd}
                                        </span>
                                    </div>
                                </div>

                                <Typography>Payment</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p
                                            className={
                                                order.paymentStatus &&
                                                    order.paymentStatus === true
                                                    ? "greenColor"
                                                    : "redColor"
                                            }
                                        >
                                            {order.paymentStatus &&
                                                order.paymentStatus === true
                                                ? "PAID"
                                                : "NOT PAID"}
                                        </p>
                                    </div>

                                    <div>
                                    
                                        <p>Amount: {order.amt && Web3.utils.fromWei(order.amt, 'ether')} eth</p>
                                    </div>
                                </div>

                                <Typography>Order Status</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p
                                            className={
                                                order.orderStatus && order.orderStatus === "delivered"
                                                    ? "greenColor"
                                                    : "redColor"
                                            }
                                        >
                                            {order.orderStatus && order.orderStatus}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="confirmCartItems">
                                <Typography>Cart Items:</Typography>
                                <div className="confirmCartItemsContainer">
                                    <div>
                                        <img src={`https://ipfs.infura.io/ipfs/${product.imgHash}`} alt="Product" />
                                        <Link to={`/product/${product.pid}`}>
                                            {product.name}
                                        </Link>{" "}
                                        <span>
                                            {order.qnt} X {product.price && Web3.utils.fromWei(product.price, 'ether')} eth={" "}
                                            <b>{product.price && Web3.utils.fromWei(`${product.price * order.qnt}`, 'ether')} eth</b>
                                           
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div
                            style={{
                                display: order.orderStatus === "processing" ? "block":"none",
                            }}
                        >
                            <form
                                className="updateOrderForm"
                                onSubmit={updateOrderSubmitHandler}
                            >
                                <h1>Process Order</h1>

                                <div>
                                    <AccountTreeIcon />
                                    <select onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Choose Category</option>
                                        {order.orderStatus === "processing" && (
                                            <option value="dispatched">Shipped</option>
                                        )}
                                    </select>
                                </div>

                                <Button
                                    id="createProductBtn"
                                    type="submit"
                                >
                                    Process
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default ProcessOrder;