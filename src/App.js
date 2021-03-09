import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

import LandingPage from './pages/LandingPage';
import CharacterPage from './pages/CharacterPage';

function App() {
  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: "whitesmoke" }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/character/:characterId" component={CharacterPage}></Route>
          {/* default page */}
          <Route component={LandingPage}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
