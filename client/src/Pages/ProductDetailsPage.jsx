import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

export default function ProductDetailsPage(props) {
  const [productData, setProductData] = useState(null);
  const [pictureData, setPictureData] = useState(null);
  let pictures;

  async function fetchData() {
    const id = props.match.params.id;
    const url = `http://localhost:3000/api/products/${id}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProductData(data);
          setPictureData(data.pictures);
        }
      })
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (pictureData) {
    pictures = [
      pictureData.picture1,
      pictureData.picture2,
      pictureData.picture3,
    ];
  }

  return (
    <>
      <Navigation />
      <div>
        <h1>product details page</h1>
        {productData ? (
          <>
            <h2>{productData.title}</h2>
            <p>{productData.description}</p>
            <p>{productData.price} kr</p>

            {pictures
              ? pictures.map((value) => {
                  return <img src={value} />;
                })
              : "pictures loading..."}

            <p>Product details</p>
            <p>
              Category: {productData.category[0]}, {productData.category[1]}
            </p>
            <p>Manufactorer: {productData.manufactorer}</p>
            <p>Weight: {productData.weight} g</p>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
}
