import { withKnobs } from '@storybook/addon-knobs';

module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  decorators: [withKnobs],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
  ],
};
