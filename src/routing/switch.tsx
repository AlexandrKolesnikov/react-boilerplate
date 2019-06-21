import React from 'react';
import { Switch as ReactRouterSwitch, Route, Redirect } from 'react-router-dom';
import { DEFAULT_ROUTE, ROUTES } from './constants';
import Home from '../modules/home/components/index';

const Switch = () => (
  <ReactRouterSwitch>
    <Route
      path={ROUTES.home.path}
      exact={ROUTES.home.exact}
      component={Home}
    />
    <Redirect to={DEFAULT_ROUTE.path} />
  </ReactRouterSwitch>
);

export default Switch;
