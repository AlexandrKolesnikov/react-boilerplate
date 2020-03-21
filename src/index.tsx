import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { history } from './routing/history';
import { Switch } from './routing/switch';
import { store } from './store/store';
import { App } from './modules/app/components';
import { CircularLoader } from './components/loaders/circular';
import './styles/app.scss';

const AppRoot = () => (
  <Suspense fallback={<CircularLoader />}>
    <Provider store={store}>
      <App>
        <Router history={history}>
          <Switch />
        </Router>
      </App>
    </Provider>
  </Suspense>
);

const render = () => {
  ReactDOM.render(
    <AppRoot />,
    document.getElementById('root'),
  );
};

render();

if (module.hot) {
  module.hot.accept('./index.tsx', () => {
    render();
  });
}
