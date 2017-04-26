'use strict';

import React from 'react';
import Events from './events';
import Headers from './headers';
import Highlight from 'react-highlight';

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
    this.setState({ result: result });
  }

  handleSelectTab(e) {
    const tab = e.target.dataset.tab;
    this.setState({ tab: tab });
  }

  getHighlightLanguage() {
    const headers = this.state.result.headers;
    const contentType = (headers && headers['content-type']) || '';

    if (contentType.match(/html/)) {
      return 'html';
    } else if (contentType.match(/json/)) {
      return 'json';
    } else if (contentType.match(/xml/)) {
      return 'xml';
    }

    return '';
  }

  render() {
    const handleSelectTab = this.handleSelectTab.bind(this);
    const result = this.state.result;
    const highlightLanguage = this.getHighlightLanguage();
    const tabClasses = {
      body: this.state.tab === 'body' ? 'active' : null,
      errors: this.state.tab === 'errors' ? 'active' : null,
    };

    return (
      <div className="response">
        <h1>Response <span id="response">{result.response}</span></h1>
        <div className="content-container">
          <div className="content">
            <div id="headers">
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
            <div className="results">
              <ul className="nav">
                <li className={tabClasses.body}>
                  <a data-tab='body' onClick={handleSelectTab}>Body</a>
                </li>
                <li className={tabClasses.errors}>
                  <a data-tab='errors' href="#" onClick={handleSelectTab}>Errors</a>
                </li>
              </ul>
              <div className="raw" id="raw" style={this.state.tab === 'body' ? null : {display: 'none'}}><Highlight className={highlightLanguage}>{result.raw}</Highlight></div>
              <div className="raw" id="error" style={this.state.tab === 'errors' ? null : {display: 'none'}}><Highlight className="json">{result.error}</Highlight></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Response;
