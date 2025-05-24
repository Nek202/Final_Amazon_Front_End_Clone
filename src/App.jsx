import React from "react";
import Header from "./components/Header/Header";
import Carousel from "./components/Carousel/Carousel";
import Category from "./components/Category/Category";

import "./App.css";
import Product from "./components/Product/Product";

function App() {
  return (
    <>
      <Header />
      <Carousel />
      <Category />
      <Product/>
    </>
  );
}

export default App;
