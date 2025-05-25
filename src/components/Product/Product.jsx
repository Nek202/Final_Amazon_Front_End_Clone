import React, { useEffect, useState } from "react";
import Axios from "axios";
// Check this import statement
import ProductCard from './ProductCard'; // or correct relative path
import classes from './product.module.css'
function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className={classes.products_container}>
      {products.map((singleProduct) => (
        <ProductCard product={singleProduct} key={singleProduct.id} />
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