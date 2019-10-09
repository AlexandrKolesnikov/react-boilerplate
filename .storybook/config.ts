import { configure } from '@storybook/react';

// Automatically import all files ending in *.stories.{js,jsx,ts,tsx}$ BEGIN
const req = require.context('../stories', true, /\.stories\.[jt]s|[jt]sx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
// Automatically import all files ending in *.stories.{js,jsx,ts,tsx}$ END
