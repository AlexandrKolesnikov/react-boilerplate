import { Component } from 'react';

type WithPermissionsProps = {
	isAlternativeShown: boolean,
	alternativeContent: React.ReactNode
	children: React.ReactNode
}

const permissions = (predicate: () => boolean) => {
  class WithPermissions extends Component<WithPermissionsProps> {
    static defaultProps: WithPermissionsProps = {
			isAlternativeShown: false,
			alternativeContent: null,
			children: null,
    };

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
          alternativeContent || 'You have no correct permissions'
        );
      }

      return null;
    }
  }

  return WithPermissions;
};

export default permissions;
