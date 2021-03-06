import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AllProductsPage from './Pages/AllProductsPage';
import { UserContext } from './context/userContext';
import UserProfilePage from './Pages/UserProfilePage';
import FetchKit from './utils/fetchKit';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import CheckoutPage from "./Pages/CheckoutPage";
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  const [user, setUser] = useState(null)
  const [validToken, setValidToken] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showProfile, setShowProfile] = useState(true)
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    authenticated();
  }, [isLoggedin])

  const authenticated = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      const res = await FetchKit.validateJWTFetch(token)
      if (res.ok) {
        setIsLoggedin(true)
      } else {
        setIsLoggedin(false)
        localStorage.removeItem('token')
      }
    }
  }

  const getUser = async () => {
    if (isLoggedin) {
      const token = localStorage.getItem("token")
      FetchKit.FetchUser(token)
        .then(res => res.json())
        .then(data => {
          setUser(data)
        })
    }
  }

  return (
    <div className="container">
      <UserContext.Provider value={{ isLoggedin, setIsLoggedin, user, setUser, showEdit, setShowEdit, showProfile, setShowProfile, getUser, validToken, setValidToken }}>
        <Switch>
          <ProtectedRoutes path="/user" component={UserProfilePage} />
          <ProtectedRoutes path="/checkout" component={CheckoutPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/:id" component={ProductDetailsPage} />
          <Route path="/"><AllProductsPage /></Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
