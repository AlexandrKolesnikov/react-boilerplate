import React from 'react';
import classNames from 'classnames';
import { text } from '@storybook/addon-knobs';
import { Spinner } from '../../src/components/loaders/Spinner/Spinner';
import './styles/Spinner.stories.scss';

export default {
  component: Spinner,
  title: 'Spinner',
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
