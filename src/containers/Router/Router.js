import React from 'react';
import App from 'containers/App/App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/work/:uid" render={() => <App view="viewer" />} />
      <Route exact path="/" render={() => <App view="home" />} />
      <Route path="/" render={() => <div>404</div>} />
    </Switch>
  </BrowserRouter>
);

export default Router;
