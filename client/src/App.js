//import react from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AllProductsPage from './Pages/AllProductsPage';
import {UserContext} from './context/userContext';
import {useState} from 'react';
import UserProfilePage from './Pages/UserProfilePage';

function App() {
  const [newUser, setNewUser] = useState(Boolean)
  return (
    <div className="container">
      <UserContext.Provider value={{newUser, setNewUser}}>
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
