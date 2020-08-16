import React, { Component } from "react";
import InputArea from "./components/InputArea";
import ReadOnlyTextArea from "./components/ReadOnlyTextArea";
import Chart from "./components/Chart";
import { calculateSalaryFrom } from "./helps/Salary";
import { formatNumberToCurrency } from "./helps/Helper";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      liquidSalary: 0,
      baseInss: 0,
      defeatInss: 0,
      baseIrpf: 0,
      defeatIrpf: 0,
      salary: 0,
      chart1: 0,
      chart2: 0,
      chart3: 0,
    };
  }

  handleChange = (value) => {
    const calculatedSalary = calculateSalaryFrom(value);

    this.setState({
      liquidSalary: value,
      baseInss: formatNumberToCurrency(calculatedSalary.baseINSS),
      defeatInss: formatNumberToCurrency(calculatedSalary.discountINSS),
      baseIrpf: formatNumberToCurrency(calculatedSalary.baseIRPF),
      defeatIrpf: formatNumberToCurrency(calculatedSalary.discountIRPF),
      salary: formatNumberToCurrency(calculatedSalary.netSalary),
      chart1: calculatedSalary.discountINSS,
      chart2: calculatedSalary.discountIRPF,
      chart3: calculatedSalary.netSalary,
    });
  };

  render() {
    const {
      baseInss,
      defeatInss,
      baseIrpf,
      defeatIrpf,
      salary,
      liquidSalary,
      chart1,
      chart2,
      chart3,
    } = this.state;

    console.log(liquidSalary);

    return (
      <div>
        <h1 className="center-align">Trabalho Prático</h1>
        <div className="row">
          <InputArea value={liquidSalary} onChange={this.handleChange} />
        </div>

        <div>
          <div className="row">
            <ReadOnlyTextArea
              title="Base INSS:"
              color="#000000"
              value={baseInss}
            />
            <ReadOnlyTextArea
              title="Desconto INSS:"
              color="#e69f31"
              value={defeatInss}
            />
            <ReadOnlyTextArea
              title="Base IRPF:"
              color="#000000"
              value={baseIrpf}
            />
            <ReadOnlyTextArea
              title="Desconto IRPF:"
              color="#b30b00"
              value={defeatIrpf}
            />
            <ReadOnlyTextArea
              title="Salário Liquido:"
              color="#09b877"
              value={salary}
            />
          </div>
        </div>

        <div style={barStyle.bars}>
          <Chart value={chart1} color={"#e67e22"} />
          <Chart value={chart2} color={"#c0392b"} />
          <Chart value={chart3} color={"#16a085"} />
        </div>
      </div>
    );
  }
}

const barStyle = {
  bars: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
};
