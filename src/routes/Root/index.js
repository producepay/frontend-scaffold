import React, { PureComponent } from 'react';

import RootView from './view';
import CurrentUser from './current-user';

class Root extends PureComponent {
  state = {
    isErrored: false,
  }

  static getDerivedStateFromError(error) {
    return { isErrored: true };
  }

  render() {
    return (
      <CurrentUser>
        <RootView
          isErrored={this.state.isErrored}
        />
      </CurrentUser>
    );
  }
}

export default React.memo(Root);
