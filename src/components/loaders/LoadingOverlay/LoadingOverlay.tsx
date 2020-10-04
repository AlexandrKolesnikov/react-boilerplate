import React from 'react';
import { Overlay, IOverlayProps } from '../../Overlay/Overlay';
import { Spinner } from '../Spinner/Spinner';

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
