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

  function getProductsGender(gender) {
    //input men or women
    //map through all products, and filter by input / category
    //save data somewhere? 
    console.log(gender);
  }

  return (
    <>
      
      <div>

        {!productsData && <h1>Loading...</h1>}

        {productsData && 
        
        <>
          <h2 onClick={()=>getProductsGender("women")}>women</h2>
          <h2 onClick={()=>getProductsGender("men")}>men</h2>
          <div className="row">{productsData.map((product, index) => {
            return (
              <>
                <div className="col-md-4">
                  <ProductListItem key={index} product={product}/>
                </div>
                {/* if woman -> render woman products 
                  if men -> render men products
              */}
              </>
            )
          })}
          </div>
        </>
        }
      </div>
    </>
  )
}
