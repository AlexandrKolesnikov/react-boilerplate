import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { Overlay, OverlayColor } from '../../src/components/Overlay/Overlay';
import './styles/Overlay.stories.scss';

export default {
  component: Overlay,
  title: 'Overlay',
  decorators: [withKnobs],
};

const colorSelectOptions = {
  [OverlayColor.primary]: OverlayColor.primary,
  [OverlayColor.secondary]: OverlayColor.secondary,
};

export const Sandbox = () => (
  <div>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type
      specimen book. It has survived not only five centuries, but also the leap
      into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of
      Lorem Ipsum.
    </p>
    <Overlay color={select('color', colorSelectOptions, OverlayColor.primary)}>
      <div className="overlay-story__overlay-content">
        <h2>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with
          desktop publishing software like Aldus PageMaker including versions of
          Lorem Ipsum.
        </h2>
      </div>
    </Overlay>
  </div>
);
