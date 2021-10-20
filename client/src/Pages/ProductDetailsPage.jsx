import React, {useEffect, useState} from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Navigation from '../components/Navigation';

export default function ProductDetailsPage() {

  const [productData, setProductData] = useState(null);
  const [pictureData, setPictureData] = useState(null);
  let pictures;

  async function fetchData(){
    const baseUrl = (window.location).href; 
    const id = baseUrl.substring(baseUrl.lastIndexOf('/') + 1);

    const url = 'http://localhost:3000/api/products/';
    const url2 = url + id;

    await fetch(url2)
      .then(res => res.json())
      .then(data => {
        setProductData(data)
        setPictureData(data.pictures)
      })
  }

  useEffect( () => {
    fetchData()
  }, [])

  if(pictureData){
    pictures = [pictureData.picture1, pictureData.picture2, pictureData.picture3];
  }

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
            pictures.map((value) => {
              return <Image className="smallPic m-2" src={value} />
            })
            : "pictures loading..."}
          </div>
          <div className="largePic">
            {pictures ? <Image src={pictures[0]} fluid /> : "loading"}
          </div>
        </div>

        <Card className="col-md-6 p-3 m-2 shadow">
          <Card.Body>
            <Card.Text>{productData.description}</Card.Text>
            <div className="flex">
              <Card.Text>Price: {productData.price} kr</Card.Text>
              <Button className="lightText">Add to cart</Button>
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

