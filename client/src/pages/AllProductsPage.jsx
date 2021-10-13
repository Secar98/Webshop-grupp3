import React, {useState, useEffect} from 'react';
import ProductListItem from '../components/ProductListItem';

export default function AllProductsPage() {

  const [productsData, setProductsData] = useState(null);

  function fetchData() {
    const url = 'http://localhost:3000/api/products/';
    fetch(url)
      .then(res => res.json())
      .then(data => setProductsData(data))
  }

  useEffect( () => {
    fetchData()
  }, [])

  return (
    <>
      <div>

        {!productsData && <h1>Loading...</h1>}

        {productsData && <div>{productsData.map((product, index) => {
          return (
            <div>
              <ProductListItem key={index} product={product}/>
            </div>
            
          )
        })}</div>}
      </div>
    </>
  )
}
