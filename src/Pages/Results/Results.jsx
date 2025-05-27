import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../components/Product/ProductCard";

function Results() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    axios
      .get(
        `${productUrl}/products/category/${encodeURIComponent(categoryName)}`
      )
      .then((res) => {
        console.log("Fetched products:", res.data);
        setResults(res.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, [categoryName]);

  return (
    <LayOut>
      <section style={{ padding: "20px" }}>
        <h1>Results</h1>
        <p>Category: {categoryName}</p>
        <hr />
        <div
          className={classes.products_container}
          style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
        >
          {results.map((product) => (
            <ProductCard key={product.id} product={product} renderAdd={true} />
          ))}
        </div>
      </section>
    </LayOut>
  );
}

export default Results;
