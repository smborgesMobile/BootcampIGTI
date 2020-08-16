import React, { Component } from "react";

export default class Bands extends Component {
  constructor() {
    super();

    this.state = {
      bandName: "Calipso",
      bandMembers: [
        {
          id: 1,
          name: "Banana Bang",
          instrument: "Baixo",
        },
        {
          id: 2,
          name: "Red Purple",
          instrument: "Bateria",
        },
        {
          id: 3,
          name: "Dark Side",
          instrument: "Motoneta",
        },
      ],
    };
  }
  render() {
    const { bandName, bandMembers } = this.state;
    return (
      <div>
        <h4>{bandName}</h4>
        {bandMembers.map((band) => {
          return (
            <ul key={band.id}>
              <l1>{`${band.name}-${band.instrument}`}</l1>
            </ul>
          );
        })}
      </div>
    );
  }
}
