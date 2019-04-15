import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles/index.scss';

const CircularLoader = ({ className }) => (
  <div className={classnames('circular-loader', className)}>
    <div className="circular-loader__container">
      <div className="circular-loader__circle" />
    </div>
  </div>
);

CircularLoader.propTypes = {
  className: PropTypes.string,
};

CircularLoader.defaultProps = {
  className: '',
};

export default CircularLoader;
