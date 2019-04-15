import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const App = ({ children }) => (
  <div className="app">
    <div className="app__main-container">
      <main className="app__content">
        { children }
      </main>
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

App.defaultProps = {
  children: null,
};

export default App;
