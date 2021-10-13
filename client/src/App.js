import './App.css';
import { Switch,Route } from 'react-router-dom';
import AllProductsPage from './pages/AllProductsPage';

function App() {
  return (
    <div className="container">
      <Switch>
          <Route path="/"><AllProductsPage/></Route>
          <Route></Route>
      </Switch>
    </div>
  );
}

export default App;
