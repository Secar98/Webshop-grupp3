import React, { useState, useEffect, useContext } from 'react';
import ProductListItem from '../components/ProductListItem';
import FetchKit from '../utils/fetchKit'
import Navigation from "../components/Navigation";
import { UserContext } from '../context/userContext';
import jwt_decode from "jwt-decode";


export default function AllProductsPage() {
  const [productsData, setProductsData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchField, setSearchField] = useState("");

  const { isLoggedin } = useContext(UserContext)

  if (isLoggedin) {

  }
  const oldCart = () => {
    if (isLoggedin) {
      const token = jwt_decode(localStorage.getItem('token'))
      const decodedToken = JSON.parse(localStorage.getItem(`cart ${token.data}`))
      return decodedToken === null ? false : decodedToken;
    }
  }

  const [cart, setCart] = useState(oldCart() || []);

  const setCartToLocalstorage = (cart) => {
    if (isLoggedin) {
      const token = jwt_decode(localStorage.getItem('token'));
      localStorage.setItem(`cart ${token.data}`, JSON.stringify(cart))
    }
  }

  const fetchData = async () => {
    const res = await FetchKit.fetchAllProducts();
    const data = await res.json();
    if (res.ok) {
      setProductsData(data)
      setFilteredData(data);
    }
  };

  useEffect(() => {
    setCartToLocalstorage(cart);
    if (!productsData) {
      fetchData();
    }
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

    const checkIfCart = cart.find(item => item.id === id);
    if (!checkIfCart) {
      setCart(prevCart => [...prevCart, { id: id, amount: 1 }]);
    }
    else {
      cart.map((item, index) => {
        if (item.id === id) {
          const newArr = [...cart]
          newArr[index] = { id: id, amount: ++item.amount }
          setCart(newArr)
        }
      })
    }
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
