import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AllTeams from './AllTeams';
import TeamDetails from './team-details/TeamDetails';
import Hierarchy from './Hierarchy';
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
