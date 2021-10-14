import React, {useState, useEffect} from 'react';
import ProductListItem from '../components/ProductListItem';

export default function AllProductsPage() {

  const [productsData, setProductsData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  function fetchData() {
    const url = 'http://localhost:3000/api/products/';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProductsData(data)
        setFilteredData(data)
      })

  }

  useEffect( () => {
    fetchData()
  }, [])

  //sorting function, takes category as a parameter, returns products in that category.
  function getProductsByCategory(category) {
    const productsInCategory = productsData.filter((product) => {
      return product.category.includes(category)
    })
    setFilteredData(productsInCategory);

  }

  return (
    <>
      
      <div>

        {!filteredData && <h1>Loading...</h1>}

        {filteredData && 
        
        <>
          <h2 onClick={()=>getProductsByCategory("women")}>women</h2>
          <h2 onClick={()=>getProductsByCategory("men")}>men</h2>
          <div className="row">{filteredData.map((product, index) => {
            return (
              <>
                <div className="col-md-4">
                  <ProductListItem key={index} product={product}/>
                </div>
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
