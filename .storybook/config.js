import React from 'react';
import { configure, addDecorator } from '@storybook/react';

import '../src/styles/tailwind.css';

const req = require.context('../src/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

addDecorator(story => (
  <div className='p-4'>{story()}</div>
));

configure(loadStories, module);