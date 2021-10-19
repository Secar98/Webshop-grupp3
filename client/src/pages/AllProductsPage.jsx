import React, {useState, useEffect, useContext} from 'react';
import ProductListItem from '../components/ProductListItem';
import {UserContext} from '../context/userContext';
import FetchKit from '../utils/fetchKit';

export default function AllProductsPage() {

  const [productsData, setProductsData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchField, setSearchField] = useState("");
  const {user,setUser} = useContext(UserContext);

  function fetchData() {
    const url = 'http://localhost:3000/api/products/';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProductsData(data)
        setFilteredData(data)
      })

  }
  const getUser =  ()=>{ 
    const token=localStorage.getItem("token")
    if(token){
      FetchKit.FetchUser(token)
            .then(res=>res.json())
            .then(data=> {
              setUser(data)
              console.log(data)
          })
          .then(()=>console.log(user))
}
  }

  useEffect( () => {
    fetchData()
    getUser()
  }, [])

  //sorting function, takes category as a parameter, returns products in that category.
  function getProductsByCategory(category) {
    const productsInCategory = productsData.filter((product) => {
      return product.category.includes(category)
    })
    setFilteredData(productsInCategory);
  }
  

  /*search function, if a search field exists, filter by search field value and save to result. 
  Result is rendered. If search field doesnt exist, render nothing*/
  const result = searchField && 
   
    filteredData.filter((product) => {
      return (
        product.title === searchField
      )
    }
    )

  const handleChange = e => {
    setSearchField(e.target.value); 
  };

  return (
      
      <div>
        {user&& <h1>{user.email}</h1>}
        {!filteredData && <h1>Loading...</h1>}

        {filteredData && 
        
        <>
          <input type="text" onChange={handleChange} value={searchField} placeholder="search"/>
          <h2 onClick={()=>getProductsByCategory("women")}>women</h2>
          <h2 onClick={()=>getProductsByCategory("men")}>men</h2>
          {/* if search result exists, map through array and render it. If no search result, render 
          full data or filtered data (depending upon filter by category) */}
          { result ? 
            <p>{result.map((product, index)=>{
              return (
                <div className="col-md-4">
                  <ProductListItem key={index} product={product}/>
                </div>
              )
            })}
            </p> 
            :
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
          }
        </>
      }
      </div>
  )
}
