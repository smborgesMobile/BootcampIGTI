import React, { component, Component } from "react";
import css from "./counter.module.css";
import IncrementButton from "./IncrementButton";
import DecrementButton from "./DecrementButton";
import CounterValue from "./CounterValue";
import CounterSteps from "./CounterSteps";

export default class Counter extends Component {
  handleButtonClick = (clickType) => {
    this.props.onCount(clickType)
  };

  render() {
    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleButtonClick}/>
        <CounterValue value={this.props.countValue}/>
        <IncrementButton onIncrement={this.handleButtonClick}/>
        <CounterSteps value={this.props.currentStep}/>
      </div>
    );
  }
}
