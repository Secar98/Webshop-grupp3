import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import Navigation from "../components/Navigation";

const CheckoutPage = () => {
  const [productsData, setProductsData] = useState(null);

  const fetchData = () => {
    const items = countCart();
    const products = items.map((item) => {
      return item[0];
    });

    const body = {
      products: products,
    };

    fetch("http://localhost:3000/api/products/checkout", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setProductsData(data);
      })
      .catch((err) => console.log(err));
  };

  const countCart = () => {
    if (localStorage.getItem("Cart")) {
      const cart = JSON.parse(localStorage.getItem("Cart"));
      const counts = {};

      for (const num of cart) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }

      return Object.entries(counts);
    }
  };

  useEffect(() => {
    fetchData();
    countCart();
  }, []);
  const cartArray = countCart();

  return (
    <Container>
      <Navigation />
      <h1 class="mt-5">Du är på checkoutPage</h1>

      {productsData &&
        cartArray &&
        cartArray.map((item, index) => {
          const testProd = productsData.find(
            (product) => product._id === item[0]
          );
          const sum = Number(testProd.price * item[1]);
          return (
            <>
              <ListGroup class="p-2 bg-light border mt-5" as="ol" numbered>
                <ListGroup.Item as="li">
                  <p>Title: {testProd.title}</p>
                  <p>Price: {testProd.price}</p>
                  <p>Amount: {item[1]}</p>
                  <b class="bald">sum: {sum}</b>
                </ListGroup.Item>
              </ListGroup>
            </>
          );
        })}

      <ListGroup class="p-2 bg-light border mt-5" as="ol" numbered>
        <ListGroup.Item as="li"></ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default CheckoutPage;
