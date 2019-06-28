import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.*$
const req = require.context('../stories', true, /\.stories\.[jt]s|[jt]sx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
