import React, { Component } from "react";
import Countries from "./components/countries/Countries";
import Header from "./components/header/Header";
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: "",
    };
  }

  async componentDidMount() {
    const data = await fetch("https://restcountries.eu/rest/v2/all");
    const json = await data.json();

    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        id: numericCode,
        name,
        filteredName: name.toLowerCase(),
        flag,
        population,
      };
    });

    const filteredPopulation = allCountries.reduce((acc, curr) => {
      return acc + curr.population;
    },0);

    this.setState({
      allCountries,
      filteredCountries: allCountries,
      filteredPopulation
    });
  }

  handleChangeFilter = (newFilter) => {
    console.log(newFilter);
    this.setState({
      filter: newFilter,
    });

    const filterLowerCase = newFilter.toLowerCase();

    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.filteredName.includes(filterLowerCase);
    });

    const filteredPopulation = filteredCountries.reduce((acc, curr) => {
      return acc + curr.population;
    },0);

    console.log(filteredPopulation);

    this.setState({
      filteredCountries,
      filteredPopulation: filteredPopulation,
    });
  };

  render() {
    const { filteredCountries, filter, filteredPopulation } = this.state;

    return (
      <div>
        <h1>React Countries</h1>
        <Header
          filter={filter}
          countryCount={filteredCountries.length}
          onChangeFilter={this.handleChangeFilter}
          totalPopulation={filteredPopulation}
        />
        <Countries currentCountries={filteredCountries} />
      </div>
    );
  }
}
