import './App.css';
import { Switch,Route } from 'react-router-dom';
import AllProductsPage from './pages/AllProductsPage';

function App() {
  return (
    <>
      <Switch>
          <Route path="/"><AllProductsPage/></Route>
          <Route></Route>
      </Switch>
    </>
  );
}

export default App;
