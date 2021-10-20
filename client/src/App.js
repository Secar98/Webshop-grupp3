import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import AllProductsPage from "./Pages/AllProductsPage";
import { UserContext } from "./context/userContext";
import { useState } from "react";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import CheckoutPage from "./Pages/CheckoutPage";

function App() {
  //ändra till string
  const [newUser, setNewUser] = useState(Boolean);

  return (
    <div className="container">
      <UserContext.Provider value={{ newUser, setNewUser }}>
        <Switch>
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/:id" component={ProductDetailsPage} />
          <Route path="/">
            <AllProductsPage />
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
