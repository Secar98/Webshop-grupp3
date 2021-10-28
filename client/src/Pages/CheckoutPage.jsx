import React, { useEffect, useState, useRef } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import Navigation from "../components/Navigation";
import { useHistory } from "react-router-dom"
import FetchKit from "../utils/fetchKit";
import jwt_decode from "jwt-decode"

const CheckoutPage = () => {
  const token = jwt_decode(localStorage.getItem('token'))
  const oldCart = JSON.parse(localStorage.getItem(`cart ${token.data}`));
  const [cart, setCart] = useState(oldCart || []);
  const [productsData, setProductsData] = useState(null);
  const [totalSum, setTotalSum] = useState(0);
  const history = useHistory()


  useEffect(() => {
    setCartToLocalstorage(cart);
    fetchProductData();
    calculateTotal()
  }, [productsData, cart]);

  const fetchProductData = async () => {
    const ids = cart.map(item => item.id)
    const fetchedData = await FetchKit.fetchCheckoutPage({ products: ids })
    const res = await fetchedData.json()
    !productsData && setProductsData(res);
  };

  const setCartToLocalstorage = (cart) => {
    localStorage.setItem(`cart ${token.data}`, JSON.stringify(cart))
  }

  const calculateTotal = () => {
    let sum = 0;

    if (productsData) {
      productsData.map(item => {
        const { amount } = cart.find(cartItem => cartItem.id === item._id)
        sum += amount * item.price
      })
      setTotalSum(sum)

      if (productsData.length < 1) {
        setTotalSum(0)
      }
    }
  }

  const handleOnChange = (e) => {
    const id = e.target.id
    cart.map((item, index) => {
      if (item.id === id) {
        const newArr = [...cart]
        newArr[index] = { id: id, amount: Number(e.target.value) }
        setCart(newArr)
      }
    })
  }

  const removeProduct = (e) => {
    const id = e.target.id
    const updatedCart = cart.filter(item => item.id !== id)
    const updatedProductsData = productsData.filter(item => item._id !== id)

    setProductsData(updatedProductsData)
    setCart(updatedCart)
  }

  const disableInput = (e) => {
    e.preventDefault()
    return false
  }

  const placeOrder = async () => {
    const order = await FetchKit.placeOrderFetch({ products: cart })

    if (order.ok) {
      localStorage.setItem(`cart ${token.data}`, JSON.stringify([]))
      //push to order comfirmation
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
            const cart = JSON.parse(localStorage.getItem(`cart ${token.data}`));
            const { amount } = cart.find(cartItem => cartItem.id === item._id)
            const sum = amount * item.price;

            return (
              <>
                <div className="row checkoutItem p-2 mt-2">
                  <span className="col-7">{item.title}</span>
                  <input min="1" onKeyDown={disableInput} onChange={handleOnChange} className="col-2" type={"number"} id={item._id} defaultValue={amount} />
                  <span className="col-2">{item.price} SEK</span>
                  <span className="col-1">{sum} SEK</span>
                  <Button className="mt-3 col-1" onClick={removeProduct} id={item._id}>remove</Button>
                </div>
              </>
            );
          })}

        <div className="d-flex flex-column align-items-end">
          <h5 className="p-2 m-2">Total: {totalSum}</h5>


          {cart.length > 0 && <Button onClick={placeOrder}>Place order</Button>}
        </div>
      </div>
    </Container>

  );
};

export default CheckoutPage;
