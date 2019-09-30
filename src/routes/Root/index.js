import React, { PureComponent } from 'react';

import RootView from './view';

class Root extends PureComponent {
  state = {
    isErrored: false,
  };

  static getDerivedStateFromError(error) {
    return { isErrored: true };
  }

  render() {
    return (
      <RootView
        isErrored={this.state.isErrored}
      />
    );
  }
}

export default React.memo(Root);
