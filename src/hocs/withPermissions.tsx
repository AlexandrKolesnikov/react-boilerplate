import { Component } from 'react';

interface IWithPermissionsProps {
  alternativeContent: React.ReactNode
}

export const withPermissions = (predicate: () => boolean) => {
  class WithPermissions extends Component<IWithPermissionsProps> {
    static defaultProps = {
      alternativeContent: null,
    };

    static get isPermitted() {
      return typeof predicate === 'function' && predicate();
    }

    render() {
      const { children, alternativeContent } = this.props;

      if (WithPermissions.isPermitted) {
        return (
          children
        );
      }

      return (
        alternativeContent
      );
    }
  }

  return WithPermissions;
};
