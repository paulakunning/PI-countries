import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home';

import Form from './components/Form/Form';
import Detail from './components/CardDetail/CardDetail';
import Landing from './components/Landing/Landing';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/countries' exact component={Home} />
        <Route path='/countries/:id' component={Detail} />
        <Route path='/form' component={Form} />
      </Switch>
    </div>
  );
}

export default App;
