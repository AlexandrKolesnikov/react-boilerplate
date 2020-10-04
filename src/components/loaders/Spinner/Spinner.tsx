import React from 'react';
import classNames from 'classnames';
import './styles/Spinner.scss';

interface ISpinnerProps {
  className?: string
}

export const Spinner: React.FC<ISpinnerProps> = ({ className }) => (
  <div className={classNames('spinner', className)}>
    <svg className="spinner__circle" viewBox="25 25 50 50">
      <circle
        className="spinner__circle-path"
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
