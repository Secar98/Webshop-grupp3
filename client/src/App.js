import React, {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AllProductsPage from './Pages/AllProductsPage';
import {UserContext} from './context/userContext';
import UserProfilePage from './Pages/UserProfilePage';

function App() {
  const [user,setUser] =useState({})
  const [newUser, setNewUser] = useState(Boolean)
 
  const getUser =()=>{ 
    const url = 'http://localhost:3000/api/users/'
    const token=localStorage.getItem("token")
    if(token){
    fetch(url,{
              method: "GET",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization": token
              }
          })
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
      <UserContext.Provider value={{newUser, setNewUser,user,setUser,getUser}}>
        <Switch>
          <Route path="/user" component={UserProfilePage}/>
          <Route path="/login" component={LoginPage}/>  
          <Route path="/register" component={RegisterPage}/>  
          <Route path="/"><AllProductsPage/></Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
