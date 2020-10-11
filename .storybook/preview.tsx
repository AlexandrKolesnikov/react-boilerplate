import React from 'react';
import { createBrowserHistory } from 'history';
import { action } from '@storybook/addon-actions';
import { Router } from 'react-router-dom';
import '!style-loader!css-loader!../static/css/reset.css';
import '../src/styles/app.scss';
import './styles/index.scss';

const history = createBrowserHistory();

history.listen(action('[Router History Event]'));

export const decorators = [
  (Story: React.ComponentType) => (
    <Router history={history}>
      <Story />
    </Router>
  ),
];
