import { Component } from 'react';
import PropTypes from 'prop-types';

const permissions = (predicate) => {
  class WithPermissions extends Component {
    static get isPermitted() {
      return typeof predicate === 'function' && predicate();
    }

    render() {
      const { isAlternativeShown, children, alternativeContent } = this.props;

      if (WithPermissions.isPermitted) {
        return (
          children
        );
      }

      if (isAlternativeShown) {
        return (
          alternativeContent || 'You have no correct permisssions'
        );
      }

      return null;
    }
  }

  WithPermissions.propTypes = {
    isAlternativeShown: PropTypes.bool,
    alternativeContent: PropTypes.node,
    children: PropTypes.node,
  };

  WithPermissions.defaultProps = {
    isAlternativeShown: false,
    alternativeContent: null,
    children: null,
  };

  return WithPermissions;
};

export default permissions;
