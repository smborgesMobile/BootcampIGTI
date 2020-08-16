import React, { Component } from "react";
import css from "./countries.module.css";
import Countrie from "./Countrie";

export default class Countries extends Component {
  render() {
    const {currentCountries} = this.props;

    return (
      <div className={css.countryContainer}>
        <ul>
          {currentCountries.map((country) => {
            return <li key={country.id}><Countrie currentCountry={country} /></li>;
          })}
        </ul>
      </div>
    );
  }
}
