import React, { Component } from 'react';
import Counter from './components/counter/Counter';
import Bands from './components/band/Bands';

export default class App extends Component {

  constructor() {
    super()

    this.state = {
      currentCount: 3, 
      steps: 0
    }
  }
  
  handleCount = (clickType) => {
    const {currentCount, steps} = this.state;

    this.setState({
      currentCount: clickType === "+" ? currentCount + 1 : currentCount - 1,
      steps: steps + 1
    });
  }
  
  render() {
    const {currentCount, steps}  = this.state;
    return <div>
      <h3>Band</h3>
      <ul>
        <l1>Nome</l1>
        <l1>Instrumento</l1>
      </ul>
      <Bands/>      
      <h3>Counter 2</h3>
      <Counter onCount={this.handleCount} countValue={currentCount} currentStep={steps}/>
      <Counter onCount={this.handleCount} countValue={currentCount} currentStep={steps}/>
      <Counter onCount={this.handleCount} countValue={currentCount} currentStep={steps}/>
    </div>;
  }
}
