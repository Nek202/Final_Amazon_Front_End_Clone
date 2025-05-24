import React from "react";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./product.module.css"; //
function ProductCard(product) {
  const { image, title, id, rating, price } = product;
  return (
    <div className={`${classes.card__container}`}>
      <a href="">
        <img src={image} alt="" />
      </a>
      <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
          {/* Rating with fallback */}
          <Rating value={rating?.rate || 0} precision={0.1} />
          {/* Count with fallback */}
          <small>{rating?.count || 0}</small>
        </div>

        <div>
          {/*price*/}
          <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button}>add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
// import React from "react";
// import PropTypes from "prop-types";
// import { Rating } from "@mui/material";
// import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
// import classes from "./product.module.css"; // Fixed filename

// function ProductCard({
//   image,
//   title,
//   id,
//   rating = { rate: 0, count: 0 },
//   price,
// }) {
//   return (
//     <div className={classes.card__container}>
//       <a href={`/product/${id}`}>
//         {" "}
//         {/* Better link */}
//         <img src={image} alt={title} /> {/* Added alt text */}
//       </a>
//       <div>
//         <h3>{title}</h3>
//         <div className={classes.rating}>
//           <Rating
//             value={rating.rate}
//             precision={0.1}
//             readOnly // Added if ratings shouldn't be editable
//           />
//           <small>({rating.count})</small>
//         </div>

//         <div>
//           <CurrencyFormat amount={price} />
//         </div>
//         <button className={classes.button}>Add to Cart</button>
//       </div>
//     </div>
//   );
// }

// ProductCard.propTypes = {
//   image: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   rating: PropTypes.shape({
//     rate: PropTypes.number,
//     count: PropTypes.number,
//   }),
//   price: PropTypes.number.isRequired,
// };

// export default ProductCard;
