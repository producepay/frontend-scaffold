import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './index';

storiesOf('Elements/Button', module)
  .add('basic', () => <Button label="Click Me!" onClick={action('onClick')} />)
  .add('colors and variants', () => (
    <div className="flex items-center">
      <Button
        className="m-4"
        label="Solid Primary"
        variant="solid"
        onClick={action('onClick')}
      />
      <Button
        className="m-4"
        label="Solid Secondary"
        color="secondary"
        variant="solid"
        onClick={action('onClick')}
      />
      <Button
        className="m-4"
        label="Outlined Primary"
        variant="outlined"
        onClick={action('onClick')}
      />
      <Button
        className="m-4"
        label="Outlined Secondary"
        color="secondary"
        variant="outlined"
        onClick={action('onClick')}
      />
      <Button
        className="m-4"
        label="Outlined Secondary"
        color="secondary"
        variant="outlined"
        onClick={action('onClick')}
      />
      <Button
        className="m-4"
        label="Text Primary"
        color="primary"
        variant="text"
        onClick={action('onClick')}
      />
      <Button
        className="m-4"
        label="&times;"
        variant="icon"
        onClick={action('onClick')}
      />
      <Button
        className="m-4"
        color="secondary"
        label="&times;"
        variant="icon"
        onClick={action('onClick')}
      />
    </div>
  ));
