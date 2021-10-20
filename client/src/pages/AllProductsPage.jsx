import React, { useState, useEffect } from "react";
import ProductListItem from "../components/ProductListItem";

export default function AllProductsPage() {
  const [productsData, setProductsData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [cart, setCart] = useState([]);

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
  }, [cart]);

  //sorting function, takes category as a parameter, returns products in that category.
  function getProductsByCategory(category) {
    const productsInCategory = productsData.filter((product) => {
      return product.category.includes(category);
    });
    setFilteredData(productsInCategory);
  }

  /*search function, if a search field exists, filter by search field value and save to result. 
  Result is rendered. If search field doesnt exist, render nothing*/
  const result =
    searchField &&
    filteredData.filter((product) => {
      return product.title === searchField;
    });

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
          <input
            type="text"
            onChange={handleChange}
            value={searchField}
            placeholder="search"
          />
          <h2 onClick={() => getProductsByCategory("women")}>women</h2>
          <h2 onClick={() => getProductsByCategory("men")}>men</h2>
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
