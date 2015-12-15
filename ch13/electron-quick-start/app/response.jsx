'use strict';

import React from 'react';
import Events from './events';
import Headers from './headers';

class Response extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      tab: 'body'
    };
  }

  componentWillUnmount() {
    Events.removeListener('result', this.handleResult.bind(this));
  }

  componentDidMount() {
    Events.addListener('result', this.handleResult.bind(this));
  }

  handleResult(result) {
    console.log('handleResult:', result);
    this.setState({ result: result });
  }

  handleSelectTab(e) {
    const tab = e.target.dataset.tab;
    this.setState({ tab: tab });
  }

  render() {
    const handleSelectTab = this.handleSelectTab.bind(this);
    const result = this.state.result;
    const tabClasses = {
      body: this.state.tab === 'body' ? 'active' : null,
      errors: this.state.tab === 'errors' ? 'active' : null,
    };

    return (
      <div className="response">
        <h1>Response <span id="response">{result.response}</span></h1>
        <div className="content-container">
          <div className="content">
            <div className="raw" id="headers">
              <table className="headers">
                <thead>
                  <tr>
                    <th className="name">Header Name</th>
                    <th className="value">Header Value</th>
                  </tr>
                </thead>
                <Headers headers={result.headers} />
              </table>
            </div>
            <ul className="nav">
              <li className={tabClasses.body}><a data-tab='body' href="#" onClick={handleSelectTab}>Body</a></li>
              <li className={tabClasses.errors}><a data-tab='errors' href="#" onClick={handleSelectTab}>Errors</a></li>
            </ul>
            <pre className="raw prettyprint" id="raw" style={this.state.tab === 'body' ? null : {display: 'none'}}>{result.raw}</pre>
            <pre className="raw prettyprint" id="error" style={this.state.tab === 'errors' ? null : {display: 'none'}}>{result.error}</pre>
          </div>
        </div>
      </div>
    );
  }
}

export default Response;
