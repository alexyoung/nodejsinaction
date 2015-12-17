'use strict';

import React from 'react';
import Events from './events';
import RequestHeaders from './request_headers';

const request = remote.require('request');

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://localhost:3000',
      method: 'GET',
      headers: {
        Accept: '*/*',
        'User-Agent': 'HTTP Wizard'
      }
    };
  }

  handleChange = (e) => {
    const state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  makeRequest = () => {
    request(this.state, (err, res, body) => {
      const statusCode = res ? res.statusCode : 'No response';
      const result = {
        response: `(${statusCode})`,
        raw: body ? body : '',
        headers: res ? res.headers : [],
        error: err ? JSON.stringify(err, null, 2) : ''
      };

      Events.emit('result', result);

      new Notification(`HTTP response finished: ${statusCode}`)
    });
  }

  handleAdd = (header) => {
    const headers = this.state.headers;
    headers[header.name] = header.value;
    this.setState({ headers: headers });
  }

  handleChangeHeader = (e) => {
    const key = e.target.dataset.headerName;
    const headers = this.state.headers;
    headers[key] = e.target.value;
    this.setState({ headers: headers });
  }

  handleRemoveHeader = (e) => {
    e.preventDefault();
    const key = e.target.dataset.headerName;
    const headers = this.state.headers;
    delete headers[key];
    this.setState({ headers: headers });
  }

  render() {
    return (
      <div className="request">
        <h1>Request</h1>
        <div className="request-options">
          <div className="form-row">
            <label>URL</label>
            <input
              name="url"
              type="url"
              value={this.state.url}
              onChange={this.handleChange} />
          </div>
          <div className="form-row">
            <label>Method</label>
            <input
              name="method"
              type="text"
              value={this.state.method}
              placeholder="GET, POST, PATCH, PUT, DELETE"
              onChange={this.handleChange} />
          </div>
          <div className="form-row">
            <table className="headers">
              <thead>
                <tr>
                  <th className="name">Header Name</th>
                  <th className="value">Header Value</th>
                </tr>
              </thead>
              <RequestHeaders
                headers={this.state.headers}
                handleChangeHeader={this.handleChangeHeader}
                handleRemoveHeader={this.handleRemove}
                handleAdd={this.handleAdd} />
            </table>
          </div>
          <div className="form-row">
            <a className="btn" onClick={this.makeRequest}>Make request</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Request;
