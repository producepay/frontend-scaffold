import React, { Component } from 'react';

import RootView from './view';
import CurrentUser from './current-user';

class Root extends Component {
  state = {
    isErrored: false,
  };

  static getDerivedStateFromError(error) {
    return { isErrored: true };
  }

  render() {
    const { isErrored } = this.state;
    return (
      <CurrentUser render={() => (
        <RootView
          isErrored={isErrored}
        />)
      }/>
    );
  }
}

export default React.memo(Root);
