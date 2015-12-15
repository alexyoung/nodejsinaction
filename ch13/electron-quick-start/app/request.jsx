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

  handleChange(e) {
    switch (e.target.name) {
      case 'url':
        this.setState({ url: e.target.value });
      break;

      case 'method':
        this.setState({ method: e.target.value });
      break;
    }
  }

  makeRequest() {
    console.log('state:', this.state);
    const requestOptions = {
      url: this.state.url,
      headers: this.state.headers,
      method: this.state.method,
      body: ''
    };

    console.log('Making request:', requestOptions);

    request(requestOptions, (err, res, body) => {
      const result = {
        response: res ? `(${res.statusCode})` : '(No response)',
        raw: body ? body : '',
        headers: res ? res.headers : [],
        error: err ? JSON.stringify(err, null, 2) : ''
      };

      Events.emit('result', result);
      console.log('Got result:', result);
      prettyPrint();
    });
  }

  handleAdd(header) {
    const headers = this.state.headers;
    headers[header.name] = header.value;
    this.setState({ headers: headers });
  }

  handleRemove(e) {
    e.preventDefault();
    const key = e.target.dataset.headerName;
    const headers = this.state.headers;
    delete headers[key];
    this.setState({ headers: headers });
  }

  render() {
    const handleAdd = this.handleAdd.bind(this);
    const handleChange = this.handleChange.bind(this);
    const handleRemove = this.handleRemove.bind(this);
    const makeRequest = this.makeRequest.bind(this);

    return (
      <div className="request">
        <h1>Request</h1>
        <div className="request-options">
          <div className="form-row">
            <label>URL</label> <input name="url" type="url" value={this.state.url} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Method</label> <input name="method" type="text" value={this.state.method} placeholder="GET, POST, PATCH, PUT, DELETE" onChange={handleChange} />
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
                handleRemove={handleRemove}
                handleAdd={handleAdd} />
            </table>
          </div>
          <div className="form-row">
            <a className="btn" onClick={makeRequest}>Make request</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Request;
