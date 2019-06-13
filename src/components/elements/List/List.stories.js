import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import List from './index';
import ListItem from '../ListItem';

function ListContainer() {
  const items = [
    { label: 'Apples', value: 'apples' },
    { label: 'Bananas', value: 'bananas' },
    { label: 'Oranges', value: 'oranges' },
  ];
  const [item, setItem] = useState({ label: 'Bananas', value: 'bananas' });

  return (
    <List
      selectable
      items={items}
      activeItem={item}
      onClick={value => {
        setItem(value);
      }}
    />
  );
}

storiesOf('Elements/List', module)
  .add('basic', () => (
    <List
      items={[
        { label: 'Apples', value: 'apples' },
        { label: 'Bananas', value: 'bananas' },
        { label: 'Oranges', value: 'oranges' },
      ]}
    />
  ))
  .add('selectable', () => <ListContainer />)
  .add('with list item component', () => (
    <List
      items={[
        { label: 'Apples', value: 'apples' },
        { label: 'Bananas', value: 'bananas' },
        { label: 'Oranges', value: 'oranges' },
      ]}
      ListItemProps={{
        component: 'li',
      }}
    />
  ))
  .add('with children', () => (
    <List>
      <ListItem onClick={action('onClick')}>Apples</ListItem>
      <ListItem onClick={action('onClick')}>Bananas</ListItem>
      <ListItem onClick={action('onClick')}>Oranges</ListItem>
    </List>
  ));
