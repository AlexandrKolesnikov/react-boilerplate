import React from 'react';
import { Overlay, IOverlayProps } from '../../overlay/Overlay';
import { Spinner } from '../spinner/Spinner';

interface ILoadingOverlayProps extends Partial<IOverlayProps>{
}

export const LoadingOverlay: React.FC<ILoadingOverlayProps> = ({
  className,
  color,
}) => (
  <Overlay className={className} color={color}>
    <Spinner />
  </Overlay>
);
