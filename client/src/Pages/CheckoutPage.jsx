import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import Navigation from "../components/Navigation";

const CheckoutPage = () => {

  const [productsData, setProductsData] = useState(null);

  const fetchData = () => {
    const url = "http://localhost:3000/api/products/";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProductsData(data);
      });
  };

  const countCart = () => {
    if (localStorage.getItem("Cart")) {
      const cart = JSON.parse(localStorage.getItem("Cart"));
      const counts = {};

      for (const num of cart) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }
      console.log("count cart");
      console.log(Object.entries(counts));

      return(Object.entries(counts));
    }
  };

  useEffect(() => {
    fetchData();
    countCart();
  }, []);

  const cart = JSON.parse(localStorage.getItem("Cart"));

  if(productsData){
    countCart.map(Item => {
      const testProd = productsData.find(product => 
        product._id === Item)
        console.log(testProd);
      });
  }

  return (
    <Container>
      <Navigation />
      <h1 class="mt-5">Du är på checkoutPage</h1>

    {/* {productsData && */}
    {/* cart.map(Item => {
      const testProd = productsData.find(product => 
        product._id === Item)
        return(
          <ListGroup class="p-2 bg-light border mt-5" as="ol" numbered>
            <ListGroup.Item as="li">{testProd.title}</ListGroup.Item>
            <ListGroup.Item as="li">{testProd.price}</ListGroup.Item>
            <ListGroup.Item as="li">{testProd}</ListGroup.Item>
            <ListGroup.Item as="li">{testProd}</ListGroup.Item>
          </ListGroup>
        )
      }) */}
    }

      {/* <ListGroup class="p-2 bg-light border mt-5" as="ol" numbered>
        <ListGroup.Item as="li">{localStorage.getItem("Cart")}</ListGroup.Item>
      </ListGroup> */}
    </Container>
  );
};

export default CheckoutPage;
