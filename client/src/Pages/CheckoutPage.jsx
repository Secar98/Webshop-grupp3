import React, { useEffect, useState } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import Navigation from "../components/Navigation";
import {useHistory} from "react-router-dom"
import FetchKit from "../utils/fetchKit";

const CheckoutPage = () => {
  const history = useHistory()
  const [productsData, setProductsData] = useState(null);
  const [totalSum, setTotalSum] = useState(0);
  // let totalSum = 0;


  const fetchData = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const ids = cart.map(item => item.id)

    const obj = {
      products: ids
    }

    FetchKit.fetchCheckoutPage(obj)
      .then(res => res.json())
      .then(data => setProductsData(data))
  };

  useEffect(() => {
    fetchData();
    calculateTotalPrice();
  }, []);

  const calculateTotalPrice = () => {
    const sum = productsData.map(item => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const { amount } = cart.find(cartItem => cartItem.id === item._id)
        return amount * item.price;
    })
    setTotalSum(totalSum + sum);
    console.log(totalSum);
  }

  // const cartArray = countCart();
  // let totalSum = 0;

  // const placeOrderOnClick = () =>{
  //   const cart = countCart()
 
  //   const newBody = {
  //     totalSum: totalSum, 
  //     products: Object.entries(cart)
  //   }
    
  //   console.log(JSON.stringify(newBody))
  //   fetch("http://localhost:3000/api/orders", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //       "authorization": localStorage.getItem("token")
  //     },
  //     body: JSON.stringify(newBody),
  //   })
  //   .then(res => res.json())
  //   .then(data =>{
  //     localStorage.setItem("Cart", JSON.stringify([]))
  //     history.push("/")
  //   })
  // }

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
            const cart = JSON.parse(localStorage.getItem('cart'));
            const { amount } = cart.find(cartItem => cartItem.id === item._id)
            const sum = amount * item.price;

            return (
              <>
                <div className="row checkoutItem p-2 mt-2">
                  <span className="col-7">{item.title}</span>
                  <span className="col-2">{amount}</span>
                  <span className="col-2">{item.price} SEK</span>
                  <span className="col-1">{sum} SEK</span>
                </div>
              </>
            );
          })}

        <div className="d-flex flex-column align-items-end">
          <h5 className="p-2 m-2">Total: {totalSum}</h5>
          {/* <Button onClick={placeOrderOnClick}>Place order</Button> */}
        </div>
      </div>
    </Container>

  );
};

export default CheckoutPage;
