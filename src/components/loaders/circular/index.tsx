import React from 'react';
import classnames from 'classnames';
import './styles/index.scss';

type Props = {
  className: string,
}

const defaultProps: Props = {
  className: '',
};

const CircularLoader = ({ className }: Props) => (
  <div className={classnames('circular-loader', className)}>
    <div className="circular-loader__container">
      <div className="circular-loader__circle" />
    </div>
  </div>
);

CircularLoader.defaultProps = defaultProps;

export default CircularLoader;
