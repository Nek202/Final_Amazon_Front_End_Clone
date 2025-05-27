import React, { useContext } from "react";
import LayOut from "../../components/LayOut/LayOut";
import classes from "./Cart.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function Cart() {
  const { state, dispatch } = useContext(DataContext);
  const { basket, user } = state;
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  // console.log(basket);
  const increment =(item)=>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item
    })
  }
  const decrement =(id)=>{
    dispatch({
      type:Type.REMOVE_FROM_BASKET,
      id
    })
  }
  return (
    <LayOut>
      <section className={classes.containers}>
        <div className={classes.cart__container}>
          <h2>Hello {user?.name || "Guest"}</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops! No item in your cart.</p>
          ) : (
            basket.map((item, i) => (
              <section className={classes.cart__product}>
                <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className={classes.btn_container}>
                  <button
                    className={classes.btn}
                    onClick={() => increment(item)}
                  >
                    <IoIosArrowUp />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <IoIosArrowDown />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        <div className={classes.checkout}>
          {basket?.length !== 0 && (
            <div className={classes.subtotal}>
              <div>
                <p>Subtotal ({basket?.length} items</p>
                <CurrencyFormat amount={total} />
              </div>
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
                <br />
              </span>
              <Link to="/payments">continue to checkout</Link>
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Cart;
