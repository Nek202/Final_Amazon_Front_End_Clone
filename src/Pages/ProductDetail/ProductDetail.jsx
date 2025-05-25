
import React, { useEffect, useState } from "react";
import classes from './ProductDetail.module.css'
import { useParams } from 'react-router-dom'
import Layout from "../../components/LayOut/LayOut";
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import ProductCard from '../../components/Product/ProductCard'

function ProductDetail() {

const{productId}= useParams()
// console.log(productId);
const [product,setProduct] = useState({})
useEffect(()=>{
  setIsLoading(true)
  axios.get(`${productUrl}/products/${productId}`)
  .then((res)=>{
    setProduct(res.data)
  }).catch((err)=>{
    console.log(err)
    setIsLoading(false)
  })
},[])

  return (
    <Layout>
      {setIsLoading ? <Loader /> : <ProductCard product={product} />}
    </Layout>
  );
}

export default ProductDetail