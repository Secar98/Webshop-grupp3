//import react from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import {UserContext} from './context/userContext';
import {useState} from 'react';


function App() {
  //ändra till string
  const [newUser, setNewUser] = useState(Boolean)

  return (
    <div>
      <UserContext.Provider value={{newUser, setNewUser}}>
        <Switch>
          <Route path="/login" component={LoginPage}/>  
          <Route path="/register" component={RegisterPage}/>  
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
