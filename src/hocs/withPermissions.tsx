import React from 'react';

export const withPermissions = (predicate: () => boolean, renderFallback: () => React.ReactElement) => (
  <IComponentProps extends object>(Component: React.ComponentType<IComponentProps>): React.FC<IComponentProps> => (props: IComponentProps) => {

    if (!predicate()) {
      return renderFallback();
    }

    return (
      <Component {...props} />
    );
  }
);
