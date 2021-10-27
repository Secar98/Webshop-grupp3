import React, { useEffect, useState } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import Navigation from "../components/Navigation";
import {useHistory} from "react-router-dom"

const CheckoutPage = () => {
  const history = useHistory()
  const [productsData, setProductsData] = useState(null);
  //const [sum, setSum] = useState(0);

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
      <div className="colorBackground lightText shadow p-4 m-5">
        <h1>Checkout</h1>

        <div className="row">
          <h5 className="col-7">Title</h5>
          <h5 className="col-2">Amount</h5>
          <h5 className="col-2">Price</h5>
          <h5 className="col-1">Sum</h5>
        </div>
        {productsData &&
          productsData.map((item, index) => {
            const amount = Object.entries(cartArray).find((amount) => item._id === amount[0]);
            const sum = amount[1] * item.price;
            totalSum += sum;

            return (
              <>
                <div className="row checkoutItem p-2 mt-2">
                  <span className="col-7">{item.title}</span>
                  <span className="col-2">{amount[1]}</span>
                  <span className="col-2">{item.price} SEK</span>
                  <span className="col-1">{sum} SEK</span>
                </div>
              </>
            );
          })}

        <div className="d-flex flex-column align-items-end">
          <h5 className="p-2 m-2">Total: {totalSum}</h5>
          <Button onClick={placeOrderOnClick}>Place order</Button>
        </div>
      </div>
    </Container>

  );
};

export default CheckoutPage;
