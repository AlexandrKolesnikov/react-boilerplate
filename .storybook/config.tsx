import React from 'react';
import { addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '!style-loader!css-loader!../static/reset.css';
import '../src/styles/app.scss';
import './styles/index.scss';

const history = createBrowserHistory();

history.listen(action('[Router History Event]'));

addDecorator(story => (
  <Router history={history}>
    { story() }
  </Router>
));
