import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DEFAULT_ROUTE, ROUTES } from './constants';
import Home from '../modules/home/components';

export default () => (
  <Switch>
    <Route
      path={ROUTES.home.path}
      exact={ROUTES.home.exact}
      component={Home}
    />
    <Redirect to={DEFAULT_ROUTE.path} />
  </Switch>
);
