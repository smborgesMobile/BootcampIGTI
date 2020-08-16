import React, { Component } from "react";

export default class InputArea extends Component {
  handleChange = (event) => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { value } = this.props;
    const color = "#00a082";
    const titleColor = "#00a082";

    return (
      <div className="input-field col s3">
        <label className="active" style={{ color: titleColor, marginLeft: 10, fontSize: 20 }}>
          Sálario Bruto:
        </label>
        <input
          id="text"
          type="number"
          style={{ color: color, fontWeight: "bold", marginLeft: 10, marginRight: 100 }}
          value={value}
          placeholder="Entre com seu salário"
          min={1045}
          max={999999}
          step={10}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
