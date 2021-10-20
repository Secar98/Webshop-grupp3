import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation";

const CheckoutPage = () => {
  //   const fetchCart = () => {

  //   };

  const countCart = () => {
    if (localStorage.getItem("Cart")) {
      const cart = JSON.parse(localStorage.getItem("Cart"));
      const counts = {};

      for (const num of cart) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }
      console.log(Object.entries(counts));
    }
  };

  useEffect(() => {
    countCart();
  }, []);

  return (
    <Container>
      <Navigation />
      <h1>Du är på checkoutPage</h1>
    </Container>
  );
};

export default CheckoutPage;
