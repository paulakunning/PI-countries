import './App.css';
import { Route } from 'react-router-dom'
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form/Form';
import Detail from './components/CardDetail/CardDetail';
import Landing from './components/Landing/Landing';

function App() {
  return (
    <div className="App">
      <Route path='/' >
        <NavBar/>
      </Route>
      <Route path='/' exact >
        <Landing/>
      </Route>
      <Route path='/countries' >
        <Home/>
      </Route>
      <Route path='/countries/:id' >
        <Detail/>
      </Route>
      <Route path='/form'>
        <Form/>
      </Route>
    </div>
  );
}

export default App;
