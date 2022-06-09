import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Button, Card } from "react-bootstrap";
import './ProductCard.css'

function ProductCard(props) {
    const options = {
      edit: false,
      color: "rgba(20,20,20,1)",
      activeColor: "tomato",
      value: props.product.ratings,
      isHalf: true,
      size: window.innerWidth < 600 ? 15 : 20,
    };
    return (
      <>
        <Card className="my-5 mx-3 productCard">
          <Link to={`/product/details/${props.product._id}`}>
            <Card.Img
              className="productCardImage"
              variant="top"
              src={props.product.images[0].url}
              alt={props.product.name}
            />
          </Link>
          <Card.Body className="productCardBody">
            <Card.Title className="productCardTitle">{props.product.name}</Card.Title>
            <Card.Text>
              <h4 className="productPrice">{props.product.price}</h4>
              <div className="productStarReviews">
                <ReactStars {...options} />
                <span>{props.product.numOfReviews} review</span>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
  
  export default ProductCard;
  