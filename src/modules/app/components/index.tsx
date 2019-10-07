import React from 'react';
import './index.scss';

type Props = {
  children: React.ReactNode,
};

const defaultProps: Props = {
  children: null,
};

const App = ({ children }: Props) => (
  <div className="app">
    <div className="app__main-container">
      <main className="app__content">
        { children }
      </main>
    </div>
  </div>
);

App.defaultProps = defaultProps;

export default App;
