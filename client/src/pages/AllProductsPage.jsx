import React, {useState, useEffect} from 'react';
import ProductListItem from '../components/ProductListItem';

export default function AllProductsPage() {

  const [productsData, setProductsData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchField, setSearchField] = useState("");

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
  

  /*search
  check if searched input exists. (filter data .....)
  if yes, render that product
  if not, render all products (+maybe and error/warning if searched product is not found)*/
  const result = searchField && 
   
    filteredData.filter((product) => {
      console.log(`product.title is ${product.title}, searchField is ${searchField}`)
      return (
        product.title === searchField
        
      )
    }
    )

  console.log(result)
    //render data somewhere

  const handleChange = e => {
    setSearchField(e.target.value); 
  };

  return (
      
      <div>

        {!filteredData && <h1>Loading...</h1>}

        {filteredData && 
        
        <>
          <input type="text" onChange={handleChange} value={searchField} placeholder="search"/>
          <h2 onClick={()=>getProductsByCategory("women")}>women</h2>
          <h2 onClick={()=>getProductsByCategory("men")}>men</h2>
          { result ? 
            <p>{result.map((product, index)=>{
              return (
                <div className="col-md-4">
                  <ProductListItem key={index} product={product}/>
                </div>
              )
            })}</p> :
            <>
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
        </>
      }
      </div>
  )
}
