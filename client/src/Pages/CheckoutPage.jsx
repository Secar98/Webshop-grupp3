import React, { useEffect } from "react";

const CheckoutPage = () => {
  const fetchCart = () => {
    const cart = JSON.parse(localStorage.getItem("Cart"));
    console.log(cart);
  };

  useEffect(() => {
    fetchCart();
  }, []);
  return <div></div>;
};

export default CheckoutPage;
