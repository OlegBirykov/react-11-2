import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import ServiceAdd from './components/ServiceAdd';
import ServiceList from './components/ServiceList';

function App() { 
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={process.env.PUBLIC_URL + '/services/:id([0-9]+)'} component={ServiceAdd} />
          <Route path={process.env.PUBLIC_URL + '/services'} component={ServiceList} />
          <Redirect to={process.env.PUBLIC_URL + '/services'} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;