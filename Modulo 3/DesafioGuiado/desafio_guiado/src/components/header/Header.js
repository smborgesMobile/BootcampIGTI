import React, { Component } from "react";

export default class Header extends Component {
  handleInputChange = (event) => {
    this.props.onChangeFilter(event.target.value)
  };

  render() {
    const { filter, countryCount, totalPopulation} = this.props;
    return (
      <div>
        <input type="text" value={filter} onChange={this.handleInputChange} />
    <span>Países: {countryCount} </span>|<span> População: {totalPopulation}</span>
      </div>
    );
  }
}
