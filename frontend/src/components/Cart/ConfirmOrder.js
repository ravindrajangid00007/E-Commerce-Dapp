import React , {useState , useEffect} from 'react';
import { useSelector , useDispatch} from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import {ecommerce, address} from '../../configurations/web3';
import {clearCart} from '../../state/slices/cart';
import { pid } from 'process';
const Web3 = require('web3');
const ConfirmOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading , setLoading] = useState(false);
    const [user , setUser] = useState({});
    const { cartItems } = useSelector((state) => state.cart);
    // const { user } = useSelector((state) => state.user);
    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const shippingCharges = 0;

    const totalPrice = subtotal + shippingCharges;
    // const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
    const addressShipping = "address";

    useEffect(() => {
        ecommerce.methods.getBuyerInfo(address).call()
        .then((user) => {
            console.log("User" , user);
            setUser(user);
        });
    },[]);
    const proceedToPayment = () => {
        //payment to be happen
        let name = [] ;
        let price = [] ;
        let quantity = [] ;
        let pids = [] ;
        let imageHashs = [] ;
        let paymentID = (Math.floor(Math.random() * 100000000) + 100000000).toString().substring(1);
        console.log("payment UD" , paymentID)
        let orderStatus = "processing" ;

        for(let index = 0; index < cartItems.length ; index++) {
            name.push(cartItems[index].name);
            price.push(cartItems[index].price);
            quantity.push(cartItems[index].quantity);
            pids.push(cartItems[index].pid);
            imageHashs.push(cartItems[index].imgHash);
        }
        console.log("Address" , address);

        setLoading(true);
        console.log(name);
        console.log(price);
        console.log(quantity);
        console.log(imageHashs);
        console.log(pids);
        console.log(paymentID);
        console.log(orderStatus);
        ecommerce.methods.buyProduct(name, price, quantity,imageHashs, pids, paymentID, orderStatus).send({ from: address , value: `${totalPrice}`})
            .on('receipt', (r) => {
                console.log(r);
                navigate("/success");
                dispatch(clearCart());
                setLoading(false);
                
            }).on('error', function (error, receipt) {
                console.log(error)
                setLoading(false);
            });

        // navigate("/process-payment");
    }
    return <>
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage">
            <div>
                <div className="confirmshippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="confirmshippingAreaBox">
                        <div>
                            <p>Name:</p>
                            <span>{user.name}</span>
                        </div>
                        <div>
                            <p>Phone:</p>
                            {/* <span>{shippingInfo.phoneNo}</span> */}
                            <span>+918949392910</span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{user.deliveryAdd}</span>
                        </div>
                    </div>
                </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {cartItems && cartItems.length > 0 &&
                            cartItems.map((item) => (
                                <div key={item.pid} >
                                    <img src={`https://ipfs.infura.io/ipfs/${item.imgHash}`} alt="Product" />
                                    <Link to={`/product/details/${item.pid}`}>
                                        {item.name}
                                    </Link>
                                    <span>
                                        {item.quantity} X {Web3.utils.fromWei(item.price, 'ether')} eth ={" "}
                                        
                                        <b>{Web3.utils.fromWei(`${item.price * item.quantity}`, 'ether')} eth</b>
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div>
                <div className="orderSummary">
                    <Typography>Order Summery</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>{Web3.utils.fromWei(`${subtotal}`, 'ether')} eth</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>{shippingCharges} eth</span>
                        </div>
                    </div>

                    <div className="orderSummaryTotal">
                        <p>
                            <b>Total:</b>
                        </p>
                        
                        <span>{Web3.utils.fromWei(`${totalPrice}`, 'ether')} eth</span>
                    </div>

                    <button onClick={proceedToPayment} disabled={loading}>Proceed To Payment</button>
                </div>
            </div>
        </div>
    </>;
};

export default ConfirmOrder;
