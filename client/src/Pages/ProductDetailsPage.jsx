import React, {useEffect, useState} from 'react'
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
      <Navigation/>
      <div>
        <h1>product details page</h1>
        {productData ? 

        <>
          <h2>{productData.title}</h2>
          <p>{productData.description}</p>
          <p>{productData.price} kr</p>

          {pictures ? 
          pictures.map((value) => {
            return <img src={value} />
          })
          : "pictures loading..."}

          <p>Product details</p>
          <p>Category: {productData.category[0]}, {productData.category[1]}</p>
          <p>Manufactorer: {productData.manufactorer}</p>
          <p>Weight: {productData.weight} g</p>

        </>
        
        : <h1>Loading...</h1>}
        
        
      </div>
  </>
  )
}

