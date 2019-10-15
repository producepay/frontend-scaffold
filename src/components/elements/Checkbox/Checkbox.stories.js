import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import Checkbox from './index';

const Wrapper = (checkboxProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox onClick={() => setChecked(!checked)} checked={checked} {...checkboxProps} />
  );
}

storiesOf('elements/Checkbox', module)
.add('small', () => (
  <Wrapper value="1" />
)).add('large', () => (
  <Wrapper value="1" size="large" />
));
