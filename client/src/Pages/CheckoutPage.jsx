import React, { useEffect, useState, useRef } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import Navigation from "../components/Navigation";
import {useHistory} from "react-router-dom"
import FetchKit from "../utils/fetchKit";

const CheckoutPage = () => {
  const oldCart = JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState(oldCart || []);

  const history = useHistory()
  const [productsData, setProductsData] = useState(null);
  const [totalSum, setTotalSum] = useState(0);
  const inputRef = useRef()
  // let totalSum = 0;


  const fetchData = async () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const ids = cart.map(item => item.id)

    FetchKit.fetchCheckoutPage({products: ids})
    .then(res => res.json())
    .then(data => {
      if(!productsData){
        setProductsData(data)
      }
    })
  };

  useEffect(() => {
    setCartToLocalstorage(cart);
    fetchData();
    calculateTotal()
  }, [productsData, cart]);

  const setCartToLocalstorage = (cart) =>{
    localStorage.setItem("cart", JSON.stringify(cart))
  }
  const calculateTotal = () =>{
    const cart = JSON.parse(localStorage.getItem('cart'));
    let sum = 0;
    if(productsData){
      productsData.map(item => {
        const { amount } = cart.find(cartItem => cartItem.id === item._id)
        sum += amount * item.price
        setTotalSum(sum)
      })
    }
  }

  const handleOnChange = (e) =>{
    const cart = JSON.parse(localStorage.getItem('cart'));
    const id = e.target.id
    cart.map((item, index )=>{
      if(item.id === id){
        const newArr = [...cart]
        newArr[index] = {id: id, amount: e.target.value}
        setCart(newArr)
      }
    })
  }

  const placeOrder = async () =>{
    const orderBody = {
      totalSum: totalSum,
      products: cart
    }
    const order = await FetchKit.placeOrderFetch(orderBody)
    
    if(order){
      localStorage.setItem("cart", JSON.stringify([]))
      history.push("/")
    }
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
          productsData.map((item) => {
            const cart = JSON.parse(localStorage.getItem('cart'));
            const { amount } = cart.find(cartItem => cartItem.id === item._id)
            const sum = amount * item.price;

            return (
              <>
                <div className="row checkoutItem p-2 mt-2">
                  <span className="col-7">{item.title}</span>
                  <input onChange={handleOnChange}className="col-2" type={"number"} id={item._id} defaultValue={amount}/>
                  <span className="col-2">{item.price} SEK</span>
                  <span className="col-1">{sum} SEK</span>
                </div>
              </>
            );
          })}

        <div className="d-flex flex-column align-items-end">
          <h5 className="p-2 m-2">Total: {totalSum}</h5>
          
          <Button onClick={placeOrder}>Place order</Button>
        </div>
      </div>
    </Container>

  );
};

export default CheckoutPage;
