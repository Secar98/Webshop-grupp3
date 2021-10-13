//import react from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';


function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" component={LoginPage}/>  
      </Switch>
    </div>
  );
}

export default App;
