'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Request from './request';
import Response from './response';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Request />
        <Response />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
