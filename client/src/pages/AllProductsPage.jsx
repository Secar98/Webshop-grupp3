import React, {useState, useEffect, useContext} from 'react';
import ProductListItem from '../components/ProductListItem';
import {UserContext} from '../context/userContext';
import FetchKit from '../utils/fetchKit';
import Navigation from "../components/Navigation";


export default function AllProductsPage() {
  const [productsData, setProductsData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [cart, setCart] = useState([]);
  
  const {user,setUser,getUser} = useContext(UserContext);

  const fetchData = () => {
    const url = "http://localhost:3000/api/products/";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProductsData(data);
        setFilteredData(data);
      });
  };

  const countCart = () => {
    const counts = {};
    for (const num of cart) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    localStorage.setItem("Cart", JSON.stringify(Object.entries(counts)));
  };

  useEffect(() => {
    countCart(cart);
    fetchData();
     getUser()
  }, [cart]);

  //sorting function, takes category as a parameter, returns products in that category.
  function getProductsByCategory(category) {
    const productsInCategory = productsData.filter((product) => {
      return product.category.includes(category);
    });
    setFilteredData(productsInCategory);
  }

  function getAllProducts() {
    setFilteredData(productsData);
  }

  /*search function, if a search field exists, filter by search field value and save to result. 
  Result is rendered. If search field doesnt exist, render nothing*/
  const result =
    searchField &&
    filteredData.filter((product) => {
      return (
        product.title.includes(searchField)
      )
    }
    )

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const onAddHandler = (id) => {
    setCart((prevArray) => [...prevArray, id]);
  };

  return (
    <div>
      {!filteredData && <h1>Loading...</h1>}

      {filteredData && (
        <>
          <Navigation />
          <div className="flex p-3">
            <ul>
              <li>
                <h4 onClick={() => getAllProducts()}>show all</h4>
              </li>
              <li>
                <h4 onClick={() => getProductsByCategory("women")}>women</h4>
              </li>
              <li>
                <h4 onClick={() => getProductsByCategory("men")}>men</h4>
              </li>
            </ul>
            <input
              className="search"
              type="text"
              onChange={handleChange}
              value={searchField}
              placeholder="search"
            />
          </div>
          {/* if search result exists, map through array and render it. If no search result, render 
          full data or filtered data (depending upon filter by category) */}
          {result ? (
            <p>
              {result.map((product, index) => {
                return (
                  <div className="col-md-4">
                    <ProductListItem key={index} product={product} />
                  </div>
                );
              })}
            </p>
          ) : (
            <div className="row">
              {filteredData.map((product, index) => {
                return (
                  <>
                    <div className="col-md-4">
                      <ProductListItem
                        onAdd={onAddHandler}
                        key={index}
                        product={product}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
