import React, {Component, ComponentClass, JSXElementConstructor, ReactComponentElement} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Store from './store/store';
import App from './modules/app/components/index';
import Switch from './routing/switch';
import history from './routing/history';
import './styles/app.scss';

const render = (RouterSwitch: () => JSX.Element) => {
  ReactDOM.render(
    <Provider store={Store}>
      <Router history={history}>
        <App>
          <RouterSwitch />
        </App>
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
};

render(Switch);

if (module.hot) {
  module.hot.accept('./routing/switch', () => {
    render(require('./routing/switch').default);
  });
}
