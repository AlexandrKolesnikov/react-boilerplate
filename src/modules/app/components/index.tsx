import React from 'react';
import './index.scss';

interface IAppProps {
}

export const App: React.FC<IAppProps> = ({ children }) => (
  <div className="app">
    <div className="app__main-container">
      <main className="app__content">
        { children }
      </main>
    </div>
  </div>
);
