import React, { Component } from "react";

export default class ReadOnlyTextArea extends Component {
  render() {
    const { title, color, value} = this.props;
    return (
      <div className="input-field col s3">
        <input
          style={{ color: color, fontWeight: "bold"}}
          disabled
          type="text"
          value={value}
          id="disabled"
          className="validate"
        />
        <label className="active" style={{fontSize: 20}}>{title}</label>
      </div>
    );
  }
}
