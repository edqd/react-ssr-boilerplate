import React from 'react';
import {
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import Colours from './components/Colours';

const App = () => (
  <div className="app">
    <nav>
      <NavLink exact to="/" activeClassName="active">Home</NavLink>
      <span>&nbsp;</span>
      <NavLink exact to="/about" activeClassName="active">About</NavLink>
    </nav>

    <div className="main">
      <Switch>
        <Route path="/colours/:colour" component={Colours} />
      </Switch>
    </div>

    <footer></footer>
  </div>
);

export default App;
