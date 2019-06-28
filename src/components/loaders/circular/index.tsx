import React from 'react';
import classnames from 'classnames';
import './styles/index.scss';

type Props = {
  className?: string,
}

const defaultProps: Props = {
  className: '',
};

const CircularLoader = ({ className }: Props) => (
  <div className={classnames('circular-loader', className)}>
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

CircularLoader.defaultProps = defaultProps;

export default CircularLoader;
