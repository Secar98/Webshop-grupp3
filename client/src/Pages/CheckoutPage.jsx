import React, { useEffect, useState } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import Navigation from "../components/Navigation";
import {useHistory} from "react-router-dom"

const CheckoutPage = () => {
  const history = useHistory()
  const [productsData, setProductsData] = useState(null);

  const fetchData = () => {
    const items = countCart();
    const products = Object.entries(items).map((item) => {
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

      return counts;
    }
  };

  useEffect(() => {
    fetchData();
    countCart();
  }, []);

  const cartArray = countCart();
  let totalSum = 0;

  const placeOrderOnClick = () =>{
    const cart = countCart()
 
    const newBody = {
      totalSum: totalSum, 
      products: Object.entries(cart)
    }
    
    console.log(JSON.stringify(newBody))
    fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "authorization": localStorage.getItem("token")
      },
      body: JSON.stringify(newBody),
    })
    .then(res => res.json())
    .then(data =>{
      localStorage.setItem("Cart", JSON.stringify([]))
      history.push("/")
    })
  }

  return (
    <Container>
      <Navigation />
      <h1 class="mt-5">Du är på checkoutPage</h1>

      {productsData &&
        productsData.map((item, index) => {
          const amount = Object.entries(cartArray).find((amount) => item._id === amount[0]);
          const sum = amount[1] * item.price;
          totalSum += sum;
          
          return (
            <>
              <ListGroup class="p-2 bg-light border mt-5" as="ol" numbered>
                <ListGroup.Item as="li">
                  <p>Title: {item.title}</p>
                  <p>Price: {item.price}</p>
                  <p>Amount: {amount[1]}</p>
                  <b class="bald">sum: {sum}</b>
                </ListGroup.Item>
              </ListGroup>
            </>
          );
        })}

      <ListGroup class="p-2 bg-light border mt-5" as="ol" numbered>
        <ListGroup.Item as="li">Total: {totalSum}</ListGroup.Item>
        <Button onClick={placeOrderOnClick}>place order</Button>
      </ListGroup>
      
    </Container>

  );
};

export default CheckoutPage;
