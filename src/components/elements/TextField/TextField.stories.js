import React, { PureComponent } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TextField from './index';

class TextFieldWrapper extends PureComponent {
  state = {
    value: '',
  }

  onChange = (e) => {
    action('changed')(e);
    this.setState({ value: e.target.value });
  }

  render() {
    return <TextField {...this.props} value={this.state.value} onChange={this.onChange} />;
  }
}

storiesOf('Elements/TextField', module)
.add('basic', () => (
  <TextFieldWrapper />
));
