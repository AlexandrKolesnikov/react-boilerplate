import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { CircularLoader } from '../../src/components/loaders/circular';

const stories = storiesOf('Loaders', module);

stories.addDecorator(withKnobs);

stories
  .add('Circular', () => (
    <CircularLoader
      className={text('className', '')}
    />
  ));
