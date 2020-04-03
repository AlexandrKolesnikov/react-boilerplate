import React from 'react';
import classNames from 'classnames';
import './styles/Overlay.scss';

export type ColorUnion = 'primary' | 'secondary';

export const OverlayColor : { [key in ColorUnion] : ColorUnion } = {
  primary: 'primary',
  secondary: 'secondary',
};

export interface IOverlayProps {
  className?: string,
  color?: ColorUnion,
  onClick?: () => void,
}

export const Overlay: React.FC<IOverlayProps> = ({
  className,
  color = OverlayColor.primary,
  children,
  onClick,
}) => (
  <div className="overlay">
    <div
      className={classNames(
        'overlay__backdrop',
        `overlay__backdrop--${color}`,
        className,
      )}
      role="presentation"
      onClick={onClick}
    />
    {children && <div className="overlay__content">{children}</div>}
  </div>
);
