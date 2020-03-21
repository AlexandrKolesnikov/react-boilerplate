import React, { lazy } from 'react';
import { Switch as ReactRouterSwitch, Route, Redirect } from 'react-router-dom';
import { DEFAULT_ROUTE, ROUTES_MAP } from './constants';

const ROUTES = [
  { ...ROUTES_MAP.home, component: lazy(() => import('../modules/home/components')) },
];

export const Switch = () => (
  <ReactRouterSwitch>
    { ROUTES.map((route) => (
      <Route
        key={route.path}
        {...route}
      />
    )) }
    <Redirect to={DEFAULT_ROUTE.path} />
  </ReactRouterSwitch>
);
