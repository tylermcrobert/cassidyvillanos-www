import React from 'react';
import App from 'containers/App/App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/work/:uid" render={() => <App view="viewer" />} />
      <Route exact path="/" render={() => <App view="home" />} />
      <Route exact path="/about" render={() => <App view="about" />} />
      <Route path="/" render={() => <div className="notFound">404—Not Found</div>} />
    </Switch>
  </BrowserRouter>
);

export default Router;
