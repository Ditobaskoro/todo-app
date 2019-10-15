import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import PrivateRoute from "./routes/Private";
import Todo from './components/Todo';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/todo" component={Todo} />
          <Redirect path="/" to="/todo" exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
