import React, {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AllProductsPage from './pages/AllProductsPage';
import {UserContext} from './context/userContext';
import UserProfilePage from './Pages/UserProfilePage';
import FetchKit from './utils/fetchKit';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import CheckoutPage from "./Pages/CheckoutPage";

function App() {
  const [user,setUser] =useState(null)
  const [newUser, setNewUser] = useState(Boolean)
  const[showEdit,setShowEdit] = useState(false)
  const[showProfile,setShowProfile] = useState(true)

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

  return (
    <div className="container">
      <UserContext.Provider value={{newUser, setNewUser,user,setUser,showEdit,setShowEdit,showProfile,setShowProfile,getUser}}>
        <Switch>
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/user" component={UserProfilePage}/>
          <Route path="/login" component={LoginPage}/>  
          <Route path="/register" component={RegisterPage}/>  
          <Route path="/:id" component={ProductDetailsPage}/>
          <Route path="/"><AllProductsPage/></Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
