import React, { useEffect, useState, useContext } from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Navigation from '../components/Navigation';
import { UserContext } from '../context/userContext';
import jwt_decode from "jwt-decode";

export default function ProductDetailsPage(props) {
  const [productData, setProductData] = useState(null);
  const [pictureData, setPictureData] = useState(null);
  const [largePic, setLargePic] = useState(null);

  const { isLoggedin } = useContext(UserContext)

  const oldCart = () => {
    if (isLoggedin) {
      const token = jwt_decode(localStorage.getItem('token'))
      const decodedToken = JSON.parse(localStorage.getItem(`cart ${token.data}`))
      return decodedToken === null ? false : decodedToken;
    }
  }

  const [cart, setCart] = useState(oldCart() || []);

  const setCartToLocalstorage = (cart) => {
    if (isLoggedin) {
      const token = jwt_decode(localStorage.getItem('token'));
      localStorage.setItem(`cart ${token.data}`, JSON.stringify(cart))
    }
  }

  let pictures;
  const baseUrl = (window.location).href;
  const id = baseUrl.substring(baseUrl.lastIndexOf('/') + 1);

  async function fetchData() {
    const url = 'https://my-app-server-webshop-grupp3.herokuapp.com/api/products/';
    const url2 = url + id;

    await fetch(url2)
      .then(res => res.json())
      .then(data => {
        setProductData(data)
        setPictureData(data.pictures)
        setLargePic(data.pictures.picture1)
      })
  };


  useEffect(() => {
    setCartToLocalstorage(cart);
    fetchData();
  }, [cart]);



  if (pictureData) {
    pictures = [pictureData.picture1, pictureData.picture2, pictureData.picture3];

    if (pictures[2] == null) {
      pictures.pop();
    }
    if (pictures[1] == null) {
      pictures.pop();
    }
  }

  function handleOnClick(e) {
    e.preventDefault();
    setLargePic(pictures[e.target.id]);
  }

  function onAdd() {
    const checkIfCart = cart.find(item => item.id === id);
    if (!checkIfCart) {
      setCart(prevCart => [...prevCart, { id: id, amount: 1 }]);
    }
    else {
      cart.map((item, index) => {
        if (item.id === id) {
          const newArr = [...cart]
          newArr[index] = { id: id, amount: ++item.amount }
          setCart(newArr)
        }
      })
    }
  };

  return (
    <>
      <Navigation />
      <div className="row">
        {productData ?

          <>

            <Card.Title className="text-center p-3">{productData.title}</Card.Title>
            <div className="flex col-md-5 p-3 m-2 colorBackground shadow">
              <div>
                {pictures ?
                  pictures.map((value, key) => {
                    return <Image className="smallPic m-2" id={key} src={value} onClick={handleOnClick} />
                  })
                  : "pictures loading..."}
              </div>
              <div className="largePic">
                {pictures ? <Image src={largePic} fluid /> : "loading"}
              </div>
            </div>

            <Card className="col-md-6 p-3 m-2 shadow">
              <Card.Body>
                <Card.Text>{productData.description}</Card.Text>
                <div className="flex">
                  <Card.Text>Price: {productData.price} kr</Card.Text>
                  {isLoggedin && < Button className="lightText" onClick={onAdd} >Add to cart</Button>}
                </div>
              </Card.Body>
              <Card.Footer className="col-12">
                <Card.Text>Category: {productData.category[0]}, {productData.category[1]}</Card.Text>
                <Card.Text>Manufactorer: {productData.manufactorer}</Card.Text>
                <Card.Text>Weight: {productData.weight} g</Card.Text>
              </Card.Footer>
            </Card>

          </>

          : <h1>Loading...</h1>}


      </div>
    </>
  )
}
