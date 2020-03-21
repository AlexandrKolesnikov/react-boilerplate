import React from 'react';
import classNames from 'classnames';
import './styles/index.scss';

interface ICircularLoaderProps {
  className?: string
}

export const CircularLoader: React.FC<ICircularLoaderProps> = ({ className }) => (
  <div className={classNames('circular-loader', className)}>
    <svg className="circular-loader__circle" viewBox="25 25 50 50">
      <circle
        className="circular-loader__circle-path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  </div>
);
