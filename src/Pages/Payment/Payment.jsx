import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";

function Payment() {
  const { state, dispatch } = useContext(DataContext);

  const basket = state?.basket || [];
  const navigate = useNavigate();
  const totalItem = basket?.reduce((amount, item) => {
    return (item.amount || 1) + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const user = state?.user;

  const handleChange = (e) => {
    if (e?.error?.message) {
      setCardError(e.error.message);
    } else {
      setCardError(null);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      setPaymentError(null);
      //1. backend || functions -----> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      const clientSecret = response.data?.clientSecret;
      //2. client side (react side confirmation)
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setPaymentError(error.message);
        setProcessing(false);
        return;
      }

      //3. after the confirmation --> order firestore database save, then clear basket
      await db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // empty the basket
      dispatch({ type: "EMPTY_BASKET" });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new Order" } });
    } catch (error) {
      setPaymentError(error.message || "Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout({totalItem}) items</div>

      <section className={classes.Payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email || "Guest User"}</div>
            <div>1234 React Land</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment__card__contiainer}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {paymentError && (
                  <small style={{ color: "red" }}>{paymentError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "12px" }}>
                      <p>Total Orders</p>
                      <CurrencyFormat amount={total}></CurrencyFormat>
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={processing || !stripe || !elements}
                  >
                    {processing ? (
                      <div className={classes.load}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
