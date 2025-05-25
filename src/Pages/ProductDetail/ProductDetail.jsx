import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LayOut from "../../components/LayOut/LayOut";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Rating } from "@mui/material";
import { productUrl } from "../../Api/endPoints";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ Declare loading state

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return (
      <LayOut>
        <p style={{ textAlign: "center" }}>Loading product...</p>
      </LayOut>
    );
  }

  if (!product) {
    return (
      <LayOut>
        <p style={{ textAlign: "center" }}>Product not found.</p>
      </LayOut>
    );
  }

  return (
    <LayOut>
      <div style={{ padding: "40px", display: "flex", gap: "40px" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "300px" }}
        />
        <div>
          <h1>{product.title}</h1>
          <Rating value={product.rating?.rate || 0} readOnly precision={0.1} />
          <p>{product.description}</p>
          <CurrencyFormat amount={product.price} />
          <br />
          <button>Add to Cart</button>
        </div>
      </div>
    </LayOut>
  );
}

export default ProductDetail;
