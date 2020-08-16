import React, { Component } from "react";
import ProjetoBase from "./components/ProjetoBase/ProjetoBase";
import { getFormattedTimeStamp } from "./helpers/dateTimeHelpers";

export default class App extends Component {
  constructor() {
    super();

    //Definindo estado inicial
    this.state = {
      clickArray: [],
    };
  }

  handleClick = () => {
    const newClickArray = Object.assign([], this.state.clickArray);
    newClickArray.push(getFormattedTimeStamp());

    this.setState({ clickArray: newClickArray });
  };

  componentDidUpdate() {
    document.title = this.state.clickArray.length.toString();
  }
  
  //Renderização de tudo.
  render() {
    const { clickArray } = this.state;

    return (
      <div>
        <h1>
          React e <em>class components</em>
        </h1>

        <button onClick={this.handleClick}>Click aqui!</button>

        <ul>
          {clickArray.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}
