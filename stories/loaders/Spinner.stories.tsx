import React from 'react';
import classNames from 'classnames';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Spinner } from '../../src/components/loaders/spinner/Spinner';
import './styles/Spinner.stories.scss';

export default {
  component: Spinner,
  title: 'Spinner',
  decorators: [withKnobs],
};

export const Sandbox = () => (
  <Spinner
    className={classNames('spinner-storybook__spinner', text('className', ''))}
  />
);

export const DifferentSizes = () => (
  <>
    <Spinner className={classNames('spinner-storybook__spinner', 'spinner-storybook__spinner--big')} />
    <Spinner className="spinner-storybook__spinner" />
  </>
);
