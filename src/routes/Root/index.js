import React, { Component } from 'react';

import RootView from './view';

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
      <RootView
        isErrored={isErrored}
      />
    );
  }
}

export default React.memo(Root);
