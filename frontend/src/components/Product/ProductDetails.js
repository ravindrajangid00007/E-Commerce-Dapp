import React, { useEffect, useState } from "react";
import ElasticCarousel from 'react-elastic-carousel';
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
// import { addItemToCart } from "../../state/action-creators/cartAction";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {addItemToCart} from '../../state/slices/cart';
import { ecommerce, address } from '../../configurations/web3';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from "@material-ui/core";
var Web3 = require('web3');

function ProductDetails() {
    const { id: productId } = useParams();
    console.log("product id", productId);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [product, setProduct] = useState({});

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const addItemToCartHandler = () => {
        console.log("Adding to cart")
        dispatch(addItemToCart({...product, quantity: quantity}));
      }
    

    useEffect(() => {

        function getProductDetails() {
            ecommerce.methods.getProduct(productId).call()
                .then((productDetails) => {
                    console.log("product", productDetails);
                    setProduct(productDetails);
                })
        }
        getProductDetails();

    }, [productId]);
    console.log("out side ProductDetails", product);

    const options = {
        edit: false,
        color: "rgba(20,20,20,1)",
        activeColor: "tomato",
        value: 5,
        isHalf: true,
        size: window.innerWidth < 600 ? 25 : 30,
    };

    const breakpoints = [
        { width: 1, itemsToShow: 1 }
    ]
    console.log("products", product);
    return (
        <>

            <div className="productDetails">
                <div className="carrousel-product-container">
                    <div className="carouselBox">
                        <ElasticCarousel breakPoints={breakpoints} className="carousel-container"
                            showArrows={true}
                        >
                            {
                            product.imgHash &&
                                <div className="carouselImage">
                                    <img
                                        src={`https://ipfs.infura.io/ipfs/${product.imgHash}`}
                                        alt={`Slide`}
                                    />
                                </div>
                            }

                        </ElasticCarousel>
                    </div>
                    <div className="productDetailBox">
                        <div className="detailsBlock-1">
                            <h2>{product.name}</h2>
                            <p>Product # {product.pid}</p>
                        </div>
                        <div className="detailsBlock-3">
                            <h1>{`${product.price && Web3.utils.fromWei(product.price, 'ether')}`}eth</h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input type="number" readOnly={true} value={quantity} />
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                                {product.stock >= 1 && <button disabled={product.stock < 1 ? true : false} onClick={addItemToCartHandler}>Add to Cart</button>}
                            </div>
                            <p>
                                <b>Status:</b>
                                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                        </div>
                        <div className="detailsBlock-4">
                            Description: <p>{product.desc}</p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ProductDetails;
