'use strict';

import React from 'react';

class AddHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: null, value: null };
  }

  handleChange(e) {
    switch (e.target.name) {
      case 'name':
        this.setState({ name: e.target.value });
      break;

      case 'value':
        this.setState({ value: e.target.value });
      break;
    }
  }

  handleAdd(e) {
    e.preventDefault();
    this.props.handleAdd(this.state);
    this.setState({ name: null, value: null });
  }

  render() {
    const handleChange = this.handleChange.bind(this);
    const handleAdd = this.handleAdd.bind(this);

    return (
      <tr className="add">
        <td className="name"><input name="name" type="text" value={this.state.name} placeholder="Name" onChange={handleChange} /> </td>
        <td className="value"><input name="value" type="text" value={this.state.value} placeholder="Value" onChange={handleChange} /> <a href="#" className="round-btn" onClick={handleAdd}>+</a></td>
      </tr>
    );
  }
}

class RequestHeaders extends React.Component {
  render() {
    const headers = this.props.headers || {};
    const headerRows = Object.keys(headers).map((key, i) => {
      return (
        <tr key={i}>
          <td className="name"><label>{key}</label></td>
          <td className="value"><input name="method" type="text" value={headers[key]} data-header-name={key} onChange={this.props.handleChangeHeader} placeholder="Header value" /> <a href="#" className="round-btn" data-header-name={key} onClick={this.props.handleRemove}>&times;</a> </td>
        </tr>
      );
    });

    return (
      <tbody className="header-body">
        {headerRows}
        <AddHeader handleAdd={this.props.handleAdd} />
      </tbody>
    );
  }
}

export default RequestHeaders;
