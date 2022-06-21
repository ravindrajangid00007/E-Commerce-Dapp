import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Button, Card } from "react-bootstrap";
import './ProductCard.css'
var Web3 = require('web3');

function ProductCard(props) {
  
    return (
      <>
        <Card className="my-5 mx-3 productCard">
          <Link to={`/product/${props.product.pid}`}>
            <Card.Img
              className="productCardImage"
              variant="top"
              src={`https://ipfs.infura.io/ipfs/${props.product.imgHash}`}
              alt={props.product.name}
            />
          </Link>
          <Card.Body className="productCardBody">
            <Card.Title className="productCardTitle">{props.product.name}</Card.Title>
            <Card.Text>
              <h4 className="productPrice">price {Web3.utils.fromWei(props.product.price, 'ether')}eth</h4>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
  
  export default ProductCard;
  