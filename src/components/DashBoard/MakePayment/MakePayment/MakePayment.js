import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import useAuth from "../../../../hooks/useAuth";

const stripePromise = loadStripe(
  "pk_test_51Jwnk3BJo7jGWcceNrcYHEDSTRXSbQZCFM0Mj4HmBYRLfAB1zp98bB8KcIGVmmgh4oLL55Q5viog58bIrf7LmRlQ00KUM43fUJ"
);

const MakePayment = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const uri = `https://still-woodland-16821.herokuapp.com/userorders?email=${user.email}`;
    fetch(uri, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          history.push("/login");
        }
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, [user.email, token, history]);

  const totalPrice = orders.reduce(function (accumulator, currentValue) {
    return (
      accumulator +
      parseInt(currentValue.price) * parseInt(currentValue.quantity)
    );
  }, 0);

  if (loading)
    return (
      <div className="loader">
        <div className="outer"></div>
        <div className="middle"></div>
        <div className="inner"></div>
      </div>
    );

  return (
    <div>
      <div className="section-banner-head">
        <h2 className="section-banner-title">Payment</h2>
      </div>
      <div className="mt-2">
        <h1>Please complete your payment</h1>
        <h3>Total Products: {orders.length}</h3>
        <h3>Total Price: ${totalPrice}</h3>
        <Elements stripe={stripePromise}>
          <CheckoutForm price={totalPrice} />
        </Elements>
      </div>
    </div>
  );
};

export default MakePayment;
