import React from "react";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./product.module.css";

function ProductCard({ product }) {
  // Guard clause to avoid error
  if (!product) {
    return <div>Product not found.</div>;
  }

  const { image, title, id, rating, price } = product;

  return (
    <div className={classes.card__container}>
      <a href="#">
        <img
          src={image || "https://via.placeholder.com/150"}
          alt={title}
          className={classes.card__image}
        />
      </a>
      <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>{rating?.count || 0} reviews</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button}>Add to Cart</button>
      </div>
    </div>
  );
}

// Add PropTypes for safety
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number,
    }),
  }),
};

export default ProductCard;
