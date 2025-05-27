import React, { useEffect, useState } from "react";
import Axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 👈 Added loading state

  useEffect(() => {
    setIsLoading(true); // 👈 Start loading
    Axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false); // 👈 End loading
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // 👈 End loading even if error
      });
  }, []);

  if (isLoading) {
    return <p style={{ textAlign: "center" }}>Loading products...</p>; // 👈 Loading message
  }

  return (
    <section className={classes.products_container}>
      {products.map((singleProduct) => (
        <ProductCard product={singleProduct} key={singleProduct.id} renderAdd={true} />
      ))}
    </section>
  );
}

export default Product;

// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import ProductCard from './ProductCard';

// function Product() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     Axios.get("https://fakestoreapi.com/products")
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
//       {products.map((product) => (
//         <ProductCard
//           key={product.id}
//           image={product.image}
//           title={product.title}
//           id={product.id}
//           rating={product.rating}
//           price={product.price}
//         />
//       ))}
//     </section>
//   );
// }

// export default Product;
