import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AllTeams from 'pages/AllTeams';
import TeamDetails from 'pages/TeamDetails';
import Hierarchy from 'pages/Hierarchy';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Switch>
            <Route path="/" exact>
              <AllTeams />
            </Route>
            <Route path="/hierarchy" exact>
              <Hierarchy />
            </Route>
            <Route path="/team/:team" exact>
              <TeamDetails />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
