import React, { useContext, useEffect } from "react";

import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "./product.module.css";
import PropTypes from "prop-types";

function ProductCard({ product }) {
  if (!product) return <div>Product not found.</div>;

  const { image, title, id, rating, price } = product;

  // 👉 useContext returns { state, dispatch }:
  const { state, dispatch } = useContext(DataContext);
  console.log(state);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET, // lowercase “type”
      item: { image, title, id, rating, price },
    });
  };

  return (
    <div className={classes.card__container}>
      <Link to={`/products/${id}`}>
        <img
          src={image || "https://via.placeholder.com/150"}
          alt={title}
          className={classes.card__image}
        />
      </Link>
      <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>{rating?.count || 0} reviews</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

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
  }).isRequired,
};

export default ProductCard;
