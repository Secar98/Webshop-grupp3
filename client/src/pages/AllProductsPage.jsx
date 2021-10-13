import React, {useState, useEffect} from 'react';

export default function AllProductsPage() {

  const [productsData, setProductsData] = useState([]);

  function fetchData() {
    const url = 'http://localhost:3000/api/products/';
    fetch(url)
      .then(res => res.json())
      .then(data => console.log(data))
  }
  //fetch function

  useEffect( () => {
    fetchData()
  }, [])

  //useEffect som använder fetch och uppdaterar prductsData

  return (
    <>
      <p>This is a page</p>
    </>
  )
}
